package com.toby.BackupApi.service;

import com.toby.BackupApi.entity.Log;
import com.toby.BackupApi.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LogService {

    private final LogRepository logRepository;

    @Autowired
    public LogService(LogRepository logRepository) {
        this.logRepository = logRepository;
    }

    // Guardar un nuevo log
    public Log crearLog(Log log) {
        return logRepository.save(log);
    }

    // Obtener todos los logs
    public List<Log> obtenerTodosLogs() {
        return logRepository.findAll();
    }

    // Obtener log por ID
    public Log obtenerLogPorId(Long id) {
        return logRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Log no encontrado"));
    }

    // Buscar logs con filtros
    public List<Log> buscarLogs(String dispositivo, String tipo, LocalDateTime fechaInicio, LocalDateTime fechaFin) {
        return logRepository.findWithFilters(dispositivo, tipo, fechaInicio, fechaFin);
    }
}