package com.toby.BackupApi.repository;

import com.toby.BackupApi.model.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;
@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {
    Optional<Device> findByName(String name);
    List<Device> findByNameContaining(String name);
    // Puedes agregar métodos personalizados si lo necesitas
}