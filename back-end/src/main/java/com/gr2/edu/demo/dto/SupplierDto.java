package com.gr2.edu.demo.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SupplierDto {
    private String code;

    private String name;
    private String phone;
    private String email;
    private String address;
    private Long debtMoney;

}
