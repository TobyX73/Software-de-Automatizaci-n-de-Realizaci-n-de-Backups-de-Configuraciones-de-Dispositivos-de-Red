package com.toby.BackupApi.service;

import com.toby.BackupApi.entity.Log;
import com.toby.BackupApi.model.Device;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Service
public class BackupService {

    @Autowired
    private SSHService sshService;

    @Autowired
    private LogService logService; // Inyectar LogService

    public boolean generateBackup(Device device) {
        boolean success = false;
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String backupFileName = device.getName().replaceAll(" ", "_") + "_backup_" + timestamp + ".rsc";
        String mikrotikBackupFile = backupFileName.replaceAll(" ", "_");
        String localBackupPath = "backups/" + backupFileName;
        String comandoExport = "/export file=" + mikrotikBackupFile;

        System.out.println("[INFO] Iniciando backup para dispositivo: " + device.getName() + " (" + device.getIpHostname() + ")");
        System.out.println("[INFO] Archivo destino local: " + localBackupPath);
        System.out.println("[INFO] Ejecutando comando en Mikrotik: " + comandoExport);

        if (!sshService.probarConexionSSH(device.getIpHostname(), 22, device.getUsername(), device.getPassword())) {
            System.out.println("[ERROR] No se pudo conectar por SSH al dispositivo: " + device.getIpHostname());
            // Crear un log de error
            logService.crearLog(new Log(
                    LocalDateTime.now(),
                    "ERROR",
                    device.getName(),
                    "No se pudo conectar por SSH al dispositivo"
            ));
            return false;
        }

        System.out.println("[INFO] Conexión SSH exitosa");

        try {
            // 1. Ejecutar el comando de export en el Mikrotik
            String resultado = sshService.ejecutarComando(device.getIpHostname(), 22, device.getUsername(), device.getPassword(), comandoExport);
            System.out.println("[DEBUG] Resultado del comando export: " + resultado);

            // 2. Descargar el archivo generado vía SFTP
            boolean descargaOk = sshService.descargarArchivoSFTP(device.getIpHostname(), 22, device.getUsername(), device.getPassword(), "/" + mikrotikBackupFile, localBackupPath);
            if (!descargaOk) {
                System.out.println("[ERROR] No se pudo descargar el archivo de backup por SFTP");
                // Crear un log de error
                logService.crearLog(new Log(
                        LocalDateTime.now(),
                        "ERROR",
                        device.getName(),
                        "No se pudo descargar el archivo de backup por SFTP"
                ));
                return false;
            }

            System.out.println("[INFO] Backup descargado correctamente a: " + localBackupPath);

            // 3. (Opcional) Eliminar el archivo del Mikrotik después de descargarlo
            sshService.ejecutarComando(device.getIpHostname(), 22, device.getUsername(), device.getPassword(), "/file remove " + mikrotikBackupFile);

            // Crear un log de éxito
            logService.crearLog(new Log(
                    LocalDateTime.now(),
                    "INFO",
                    device.getName(),
                    "Backup realizado correctamente y guardado en " + localBackupPath
            ));

            success = true;
        } catch (Exception e) {
            System.out.println("[ERROR] Excepción durante el backup: " + e.getMessage());
            e.printStackTrace();

            // Crear un log de excepción
            logService.crearLog(new Log(
                    LocalDateTime.now(),
                    "ERROR",
                    device.getName(),
                    "Excepción durante el backup: " + e.getMessage()
            ));

            return false;
        }

        return success;
    }
}