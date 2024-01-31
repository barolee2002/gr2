package com.gr2.edu.demo.repository;
import com.gr2.edu.demo.entities.InventoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface InventoryRepository extends JpaRepository<InventoryEntity, String> {
    Optional<InventoryEntity> findByName(String name);

}
