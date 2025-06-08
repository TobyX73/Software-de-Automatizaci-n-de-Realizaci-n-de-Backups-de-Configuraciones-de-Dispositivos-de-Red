package com.toby.BackupApi.service;

import com.toby.BackupApi.model.Device;
import com.toby.BackupApi.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    public List<Device> getAllDevices() {
        return deviceRepository.findAll();
    }

    public Optional<Device> getDeviceById(Long id) {
        return deviceRepository.findById(id);
    }

    public Device saveDevice(Device device) {
        return deviceRepository.save(device);
    }

    public void deleteDevice(Long id) {
        deviceRepository.deleteById(id);
    }

    public Optional<Device> getDeviceByName(String name) {
        return deviceRepository.findByName(name);
    }

    public List<Device> findDevicesByNombreContaining(String nombre) {
        return deviceRepository.findByNameContaining(nombre);
    }
}
