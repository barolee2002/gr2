package com.gr2.edu.demo.controller;

import com.gr2.edu.demo.dto.request.LoginRequest;
import com.gr2.edu.demo.dto.request.UserDtoRequest;
import com.gr2.edu.demo.dto.response.LoginResponse;
import com.gr2.edu.demo.dto.response.UserDtoResponse;
import com.gr2.edu.demo.entities.Staff;
import com.gr2.edu.demo.service.StaffServicce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class StaffController {
    @Autowired
    StaffServicce staffServicce;
    @PostMapping("/creating")
    public UserDtoResponse createUser (@RequestBody UserDtoRequest request) {
        return staffServicce.addStaff(request);
    }
    @PostMapping("/auth/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return staffServicce.login(request);
    }
    @GetMapping("/staff")
    public List<Staff> getAllStaff(){
        return staffServicce.getAll();
    }
    @GetMapping("/staffs/inventory")
    public List<Staff> getInventoryStaff(){
        return staffServicce.getInventoryStaff();
    }
    @GetMapping("/staff/{id}")
    public Staff getStaffById(@PathVariable String id){
        return staffServicce.getStaffLogin(id);
    }
}
