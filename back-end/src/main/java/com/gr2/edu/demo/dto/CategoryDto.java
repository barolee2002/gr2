package com.gr2.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;


@Data
public class CategoryDto {
    private Integer id;
    private String code;

    @NotEmpty
    private String name;
    @NotEmpty
    private String description;
}
