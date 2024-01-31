package com.gr2.edu.demo.repository;
import com.gr2.edu.demo.entities.CheckTableEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface CheckTableRepository extends JpaRepository<CheckTableEntity, String> {

    @Query("SELECT e FROM CheckTableEntity e WHERE (:code IS NULL OR LOWER(e.code) LIKE LOWER(CONCAT('%', :code, '%') )) " )
    List<CheckTableEntity> checkTableByCodeContaining(Pageable paging, @Param("code") String code);
    CheckTableEntity findByCode(String code);
    List<CheckTableEntity> findByCodeContaining(String id);
    List<CheckTableEntity> findByStatus(String status);
}
