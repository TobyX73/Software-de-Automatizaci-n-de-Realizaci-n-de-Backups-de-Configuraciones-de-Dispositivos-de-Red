package com.toby.BackupApi.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "backups")
public class Backup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String filePath;
    @ManyToOne
    @JoinColumn(name = "device_id", nullable = false)
    private Device device;

    private LocalDateTime date;

    @Enumerated(EnumType.STRING)
    private StatusBackup status; // "Exitoso", "Fallido", "Pendiente"
    private String file; // nombre del archivo
    @Enumerated(EnumType.STRING)
    private PeriocityBackup periodicity; // Diario, Semanal, Mensual

    private boolean automatic; // true si fue automático

    public Backup() {
    }

    public Backup(Long id, String filePath, Device device, String file, PeriocityBackup periodicity, StatusBackup status, boolean automatic) {
        this.id = id;
        this.file = file;
        this.device= device;
        this.filePath = filePath;
        this.periodicity = periodicity;
        this.status = status;
        this.automatic = automatic;
    }
    // getters y setters...
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getFilePath() {
        return filePath;
    }
    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }
    public Device getDevice() {
        return device;
    }
    public void setDevice(Device device) {
        this.device = device;
    }
    public LocalDateTime getDate() {
        return date;
    }
    public void setDate(LocalDateTime date) {
        this.date = date;
    }
    public StatusBackup getStatus() {
        return status;
    }
    public void setStatus(StatusBackup status) {
        this.status = status;
    }
    public String getFile() {
        return file;
    }
    public void setFile(String file) {
        this.file = file;
    }
    public PeriocityBackup getPeriodicity() {
        return periodicity;
    }
    public void setPeriodicity(PeriocityBackup periodicity) {
        this.periodicity = periodicity;
    }
    public boolean isAutomatic() {
        return automatic;
    }
    public void setAutomatic(boolean automatic) {
        this.automatic = automatic;
    }

}
