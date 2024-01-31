package com.gr2.edu.demo.entities;


import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "customer")
@Data
public class Customer {
    @Id
    @Size(max = 8)
    private String code;
    @Column
    @Size(max = 100)
    private String name;
    @Column
    @Size(max = 100)
    private String email;
    @Column(unique = true)
    private String phone;
    @Column(name = "last_contact")
    private Date lastContact;

    public Customer() {
    }

    public Customer(String code, String name, String email, String phone, Date lastContact) {
        this.code = code;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.lastContact = lastContact;
    }

    public Customer(String name, String email, String phone, Date lastContact) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.lastContact = lastContact;
    }
}
