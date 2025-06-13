package com.toby.BackupApi.controller;

import com.toby.BackupApi.model.Device;
import com.toby.BackupApi.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.toby.BackupApi.service.SSHService;
import java.util.NoSuchElementException;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/devices")
public class DeviceRestController {

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private SSHService sshService;

    @GetMapping
    public ResponseEntity<List<Device>> getAllDevices() {
        List<Device> devices = deviceService.getAllDevices();
        return ResponseEntity.ok(devices);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Device> getDeviceById(@PathVariable Long id) {
        Optional<Device> device = deviceService.getDeviceById(id);
        return device.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DeviceRestController.java
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<Device> getDeviceByName(@PathVariable String nombre) {
        Optional<Device> device = deviceService.getDeviceByName(nombre);
        return device.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Device>> getDevicesByNombre(@RequestParam String nombre) {
        List<Device> devices = deviceService.findDevicesByNombreContaining(nombre);
        return ResponseEntity.ok(devices);
    }

    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody Device device) {
        Device createdDevice = deviceService.saveDevice(device);
        return ResponseEntity.ok(createdDevice);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Device> updateDevice(@PathVariable Long id, @RequestBody Device deviceDetails) {
        Optional<Device> optionalDevice = deviceService.getDeviceById(id);
        if (optionalDevice.isPresent()) {
            Device device = optionalDevice.get();
            device.setName(deviceDetails.getName());
            device.setIpHostname(deviceDetails.getIpHostname());
            device.setUsername(deviceDetails.getUsername());
            device.setType(deviceDetails.getType());
            device.setStatus(deviceDetails.getStatus());
            Device updatedDevice = deviceService.saveDevice(device);
            return ResponseEntity.ok(updatedDevice);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDevice(@PathVariable Long id) {
        Optional<Device> optionalDevice = deviceService.getDeviceById(id);
        if (optionalDevice.isPresent()) {
            deviceService.deleteDevice(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/count")
    public ResponseEntity<Long> countDevices() {
        long count = deviceService.countDevices();
        return ResponseEntity.ok(count);
    }

    @GetMapping("/{id}/test-connection")
    public ResponseEntity<String> probarConexion(@PathVariable Long id) {
        Device device = deviceService.getDeviceById(id)
                .orElseThrow(() -> new NoSuchElementException("Dispositivo no encontrado"));

        boolean exito = sshService.probarConexionSSH(
                device.getIpHostname(),
                22,
                device.getUsername(),
                device.getPassword()
        );

        if (exito) {
            return ResponseEntity.ok("Conexión exitosa");
        } else {
            return ResponseEntity.status(503).body("No se pudo establecer conexión SSH");
        }
    }


}