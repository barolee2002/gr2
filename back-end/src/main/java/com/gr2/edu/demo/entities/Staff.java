package com.gr2.edu.demo.entities;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import jakarta.persistence.*;
import java.util.HashMap;
import java.util.Map;


@Entity
@Table(name = "staff")
@Data
public class Staff {
    @Id
    @Column(name = "code", nullable = false)
    private String code;

    @Column(name = "phone")
    private String phone;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "address")
    private String address;

    @Column(name = "role")
    private String role;
    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;


    public Staff() {
    }

    public Staff(String code, String phone, String name, String email, String address, String role) {
        this.code = code;
        this.phone = phone;
        this.name = name;
        this.email = email;
        this.address = address;

    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }


    public void setRole(String role) {
        this.role = role;
    }

    public Map<String, Object> toMap() {
        Map<String, Object> staffMap = new HashMap<>();
        staffMap.put("code", code);
        staffMap.put("phone", phone);
        staffMap.put("name", name);
        staffMap.put("email", email);
        staffMap.put("address", address);
        staffMap.put("role", role);
        return staffMap;
    }
}

