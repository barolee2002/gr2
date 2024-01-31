package com.gr2.edu.demo.dto.request;

import lombok.Data;

@Data
public class UserDtoRequest {
    private String code;
    private String phone;
    private String name;
    private String email;
    private String address;
    private String role;
    private String username;
    private String password;
}
