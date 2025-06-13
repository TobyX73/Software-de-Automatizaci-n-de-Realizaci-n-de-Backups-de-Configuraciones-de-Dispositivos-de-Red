package com.toby.BackupApi.controller;

import com.toby.BackupApi.entity.Log;
import com.toby.BackupApi.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/logs")
public class LogRestController {

    private final LogService logService;

    @Autowired
    public LogRestController(LogService logService) {
        this.logService = logService;
    }

    // Obtener todos los logs
    @GetMapping
    public ResponseEntity<List<Log>> obtenerTodosLogs() {
        return ResponseEntity.ok(logService.obtenerTodosLogs());
    }

    // Obtener log por ID
    @GetMapping("/{id}")
    public ResponseEntity<Log> obtenerLogPorId(@PathVariable Long id) {
        return ResponseEntity.ok(logService.obtenerLogPorId(id));
    }

    // Buscar logs con filtros
    @GetMapping("/buscar")
    public ResponseEntity<List<Log>> buscarLogs(
            @RequestParam(required = false) String dispositivo,
            @RequestParam(required = false) String tipo,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaInicio,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime fechaFin) {

        return ResponseEntity.ok(
                logService.buscarLogs(dispositivo, tipo, fechaInicio, fechaFin)
        );
    }

    // Crear un nuevo log (ejemplo: desde el proceso de backup)
    @PostMapping
    public ResponseEntity<Log> crearLog(@RequestBody Log log) {
        return ResponseEntity.ok(logService.crearLog(log));
    }
}