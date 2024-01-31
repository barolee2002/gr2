package com.gr2.edu.demo.repository;

import com.gr2.edu.demo.entities.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

public interface StaffRepository extends JpaRepository<Staff,String> {

    Staff findByName(String name);

    List<Staff> findByRole(String role);
    Optional<Staff> findByUsername(String username);
    Optional<Staff> findFirstByUsername(String username);
}
