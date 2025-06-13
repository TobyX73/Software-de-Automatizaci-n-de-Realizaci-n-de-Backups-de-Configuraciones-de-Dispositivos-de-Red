package com.toby.BackupApi.controller;

import com.toby.BackupApi.model.Backup;
import com.toby.BackupApi.model.Device;
import com.toby.BackupApi.model.StatusBackup;
import com.toby.BackupApi.repository.BackupRepository;
import com.toby.BackupApi.repository.DeviceRepository;
import com.toby.BackupApi.service.BackupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/backups")
public class BackupRestController {

    @Autowired
    private BackupService backupService;

    @Autowired
    private BackupRepository backupRepository;

    @Autowired
    private DeviceRepository deviceRepository;

    // 1. Obtener todos los backups
    @GetMapping
    public List<Backup> getAllBackups() {
        return backupRepository.findAll();
    }

    // 2. Obtener backups por dispositivo
    @GetMapping("/device/{deviceId}")
    public ResponseEntity<List<Backup>> getBackupsByDevice(@PathVariable Long deviceId) {
        List<Backup> backups = backupRepository.findByDevice_Id(deviceId);
        return ResponseEntity.ok(backups);
    }


    // Nuevo endpoint para ejecutar backup de un dispositivo seleccionado
    @PostMapping("/execute/{deviceId}")
    public ResponseEntity<String> executeBackup(@PathVariable Long deviceId) {
        Optional<Device> deviceOpt = deviceRepository.findById(deviceId);
        if (deviceOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Dispositivo no encontrado");
        }
        boolean success = backupService.generateBackup(deviceOpt.get());
        if (success) {
            return ResponseEntity.ok("Backup ejecutado y guardado correctamente");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al ejecutar el backup");
        }
    }

    // 4. Descargar archivo de backup
    @GetMapping("/download/{id}")
    public ResponseEntity<Resource> descargarBackup(@PathVariable Long id) {
        Optional<Backup> backupOptional = backupRepository.findById(id);
        if (backupOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        File file = new File(backupOptional.get().getFilePath());
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        FileSystemResource resource = new FileSystemResource(file);
        HttpHeaders headers = new HttpHeaders();
        headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getName());

        return ResponseEntity.ok()
                .headers(headers)
                .contentLength(file.length())
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }

    // 5. Eliminar backup
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarBackup(@PathVariable Long id) {
        Optional<Backup> optional = backupRepository.findById(id);
        if (optional.isPresent()) {
            // backupService.deleteBackup(optional.get()); // Eliminar llamada a método que ya no existe
            // Si solo quieres borrar el archivo, puedes hacerlo aquí directamente:
            File file = new File(optional.get().getFilePath());
            if (file.exists()) {
                file.delete();
            }
            backupRepository.delete(optional.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Controller activo");
    }

}
