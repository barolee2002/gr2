package com.gr2.edu.demo.entities;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


import jakarta.persistence.*;


@Entity
@Data

@Table(name = "check_line")
public class CheckLineEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    private String checkCode;
    @Column
    private String productCode;
    @Column
    private Integer inventoryQuantity;
    @Column
    private Integer actualQuantity;
    @Column
    private String reason;
    @Column
    private Integer attributeId;

}
