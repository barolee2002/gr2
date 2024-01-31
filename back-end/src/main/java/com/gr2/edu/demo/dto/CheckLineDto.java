package com.gr2.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;


@Data
public class CheckLineDto {
    @NotEmpty

    private String productName;
    @NotEmpty

    private Integer inventoryQuantity;
    @NotEmpty
    private String brand;
    @NotEmpty

    private Integer actualQuantity;

    @NotEmpty
    private String reason;
    @NotEmpty
    private String size;
    @NotEmpty
    private String color;


}
