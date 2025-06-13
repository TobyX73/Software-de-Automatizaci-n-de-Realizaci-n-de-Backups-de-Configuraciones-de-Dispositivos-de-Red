package com.toby.BackupApi.model;

import jakarta.persistence.*;

@Entity
@Table(name = "device")
public class Device {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "ip_hostname")
    private String ipHostname;

    private String username;

    private String type;

    private String status;

    private String password;

    public Device() {
    }

    public Device(Long id, String name, String ipHostname, String username, String type, String status, String password) {
        this.id = id;
        this.name = name;
        this.ipHostname = ipHostname;
        this.username = username;
        this.type = type;
        this.status = status;
        this.password = password;
    }

    // Getters y Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getIpHostname() { return ipHostname; }
    public void setIpHostname(String ipHostname) { this.ipHostname = ipHostname; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}