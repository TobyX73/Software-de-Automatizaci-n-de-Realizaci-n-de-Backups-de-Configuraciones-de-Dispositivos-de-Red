package com.toby.BackupApi.repository;

import com.toby.BackupApi.entity.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<Log, Long> {

    // Buscar logs por dispositivo
    List<Log> findByDispositivoContainingIgnoreCase(String dispositivo);

    // Buscar logs por tipo
    List<Log> findByTipo(String tipo);

    // Buscar logs entre fechas
    List<Log> findByFechaBetween(LocalDateTime inicio, LocalDateTime fin);

    // Buscar logs con filtros combinados
    @Query("SELECT l FROM Log l WHERE " +
            "(:dispositivo IS NULL OR l.dispositivo LIKE %:dispositivo%) AND " +
            "(:tipo IS NULL OR l.tipo = :tipo) AND " +
            "(:fechaInicio IS NULL OR l.fecha >= :fechaInicio) AND " +
            "(:fechaFin IS NULL OR l.fecha <= :fechaFin)")
    List<Log> findWithFilters(
            String dispositivo,
            String tipo,
            LocalDateTime fechaInicio,
            LocalDateTime fechaFin
    );
}