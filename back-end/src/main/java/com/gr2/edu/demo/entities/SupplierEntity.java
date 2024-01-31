package com.gr2.edu.demo.entities;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import lombok.Data;
import jakarta.persistence.*;

import java.math.BigDecimal;



@Entity
@Data
@Table(name = "supplier")
public class SupplierEntity {
    @Id
    private String code;
    @Column
    private String name;
    @Column
    private String phone;
    @Column
    private String email;
    @Column
    private String address;
    @Column
    private BigDecimal debtMoney;
}
