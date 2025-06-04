package com.toby.BackupApi.service;

import com.jcraft.jsch.*;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.Properties;

@Service
public class SSHService {

    public String ejecutarComando(String host, int puerto, String usuario, String password, String comando) {
        StringBuilder salida = new StringBuilder();

        try {
            JSch jsch = new JSch();
            Session session = jsch.getSession(usuario, host, puerto);
            session.setPassword(password);

            // Configuración para evitar problemas con host key
            Properties config = new Properties();
            config.put("StrictHostKeyChecking", "no");
            session.setConfig(config);

            session.connect();

            ChannelExec canal = (ChannelExec) session.openChannel("exec");
            canal.setCommand(comando);

            canal.setErrStream(System.err);
            InputStream in = canal.getInputStream();
            canal.connect();

            byte[] buffer = new byte[1024];
            int leido;

            while ((leido = in.read(buffer)) != -1) {
                salida.append(new String(buffer, 0, leido));
            }

            canal.disconnect();
            session.disconnect();

        } catch (Exception e) {
            e.printStackTrace();
            return "Error al ejecutar el comando: " + e.getMessage();
        }

        return salida.toString();
    }
}