package com.gr2.edu.demo.repository;

import com.gr2.edu.demo.entities.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, String> {
}
