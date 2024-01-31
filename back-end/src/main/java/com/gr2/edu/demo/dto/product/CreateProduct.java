package com.gr2.edu.demo.dto.product;

import lombok.Data;

@Data
public class CreateProduct {

    private Integer categoryId;
    private String name;
    private String image;
    private String brand;
    private String description;
}
