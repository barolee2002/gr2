package com.gr2.edu.demo.repository;

import com.gr2.edu.demo.entities.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Integer> {

    List<History> findTop5ByOrderByHistoryDateDesc();
}
