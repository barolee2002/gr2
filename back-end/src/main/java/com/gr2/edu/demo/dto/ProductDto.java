package com.gr2.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class ProductDto {
    private String code;
    private String categoryName;
    private String name;
    private String brand;
    private String image;
    private Integer categoryId;
    private LocalDate createAt;
    private List<ProductAttributeDto> attributes;
}
