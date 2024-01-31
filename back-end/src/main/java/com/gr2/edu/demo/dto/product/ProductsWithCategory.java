package com.gr2.edu.demo.dto.product;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ProductsWithCategory {
    private String image;
    private String code;
    private String name;
    private String brand;
    private String categoryName;
    private String status;
    LocalDate createAt;

    public ProductsWithCategory(String image, String code, String name, String brand, String categoryName, String status, LocalDate createAt) {
        this.image = image;
        this.code = code;
        this.name = name;
        this.brand = brand;
        this.categoryName = categoryName;
        this.status = status;
        this.createAt = createAt;
    }

    public String getImage() {
        return image;
    }

    public String getBrand() {
        return brand;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public LocalDate getCreateAt() {
        return createAt;
    }

    public String getStatus() {
        return status;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public void setCreateAt(LocalDate createAt) {
        this.createAt = createAt;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
