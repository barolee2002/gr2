package com.gr2.edu.demo.entities;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Data

@Table(name = "booking_line")
public class BookingLineEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column
    @Size(max = 8)
    private String productCode;
    @Column
    private Integer quantity;

    @Column
    @Size(max = 8)

    private String bookingCode;
    @Column
    private BigDecimal originalCost;
    @Column
    private Integer attributeId;
    @Column
    private BigDecimal price;
}
