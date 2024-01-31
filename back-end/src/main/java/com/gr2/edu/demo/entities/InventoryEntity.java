package com.gr2.edu.demo.entities;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


import jakarta.persistence.*;


@Entity
@Data

@Table(name = "inventory")
public class InventoryEntity {
    @Id
    private String name;
    @Column
    private String address;
}
