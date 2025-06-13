package com.toby.BackupApi.repository;

import com.toby.BackupApi.model.Backup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface BackupRepository extends JpaRepository<Backup, Long> {
    List<Backup> findByDevice_Id(Long deviceId);
}
