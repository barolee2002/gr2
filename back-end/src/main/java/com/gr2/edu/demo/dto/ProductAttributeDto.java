package com.gr2.edu.demo.dto;

import jakarta.persistence.Column;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class ProductAttributeDto {
    private Integer id;
    private String productCode;
    private Integer quantity;
    private Integer sold;
    private String image;
    private String size;
    private String color;
    private String status;
    private BigDecimal originalCost;
    private BigDecimal price;
    private String inventoryName;
    private LocalDate createAt;
    private LocalDate updateAt;
}
