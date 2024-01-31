package com.gr2.edu.demo.entities;
import jakarta.validation.constraints.*;
import lombok.Data;


import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Data

@Table(name = "booking")
public class BookingEntity {
    @Id
    private String code;
    @Column
    @Size(max = 8)
    private String staffCode;
    @Column
    @Size(max = 8)
    private String supplierCode;
    @Column
    private BigDecimal total;
    @Column
    private LocalDate bookingDate;
    @Column
    private LocalDate receiptDate;
    @Column
    @Size(max =50)
    private String payStatus;
    @Column
    @Size(max = 50)
    private String bookingStatus;
    @Column
    @NotNull
    @Size(max = 50)
    private String status;
    @Column
    @Size(max = 100)
    private String inventoryName;


}
