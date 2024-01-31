package com.gr2.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class InventoryDto {
    private String name;
    @NotEmpty
    private String address;

}
