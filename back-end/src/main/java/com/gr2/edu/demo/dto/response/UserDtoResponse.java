package com.gr2.edu.demo.dto.response;

import lombok.Data;

@Data
public class UserDtoResponse {
    private String code;
    private String phone;
    private String name;
    private String email;
    private String address;
    private String role;
    private String username;
}
