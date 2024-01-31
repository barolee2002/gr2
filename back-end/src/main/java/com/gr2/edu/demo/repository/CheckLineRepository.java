package com.gr2.edu.demo.repository;
import com.gr2.edu.demo.entities.CheckLineEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface CheckLineRepository extends JpaRepository<CheckLineEntity, Long> {

    List<CheckLineEntity> findByCheckCode(String code);

}
