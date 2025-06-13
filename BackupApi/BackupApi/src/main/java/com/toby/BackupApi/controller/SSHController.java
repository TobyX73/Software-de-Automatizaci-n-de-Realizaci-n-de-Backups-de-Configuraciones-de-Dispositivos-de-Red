package com.toby.BackupApi.controller;

import com.toby.BackupApi.service.SSHService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/ssh")
public class SSHController {

    @Autowired
    private SSHService sshService;

    @PostMapping("/ejecutar")
    public ResponseEntity<String> ejecutarComando(
            @RequestParam String host,
            @RequestParam int puerto,
            @RequestParam String usuario,
            @RequestParam String password,
            @RequestParam String comando) {
        String resultado = sshService.ejecutarComando(host, puerto, usuario, password, comando);
        return ResponseEntity.ok(resultado);
    }
}