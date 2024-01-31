package com.gr2.edu.demo.entities;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


import jakarta.persistence.*;
import java.time.LocalDate;


@Entity
@Data

@Table(name = "check_table")
public class CheckTableEntity {
    @Id
    private String code;
    @Column
    private String staffCode;
    @Column
    private String status;
    @Column
    private String inventoryName;
    @Column
    private LocalDate createAt;
}
