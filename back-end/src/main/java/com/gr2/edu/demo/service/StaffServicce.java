package com.gr2.edu.demo.service;

import com.gr2.edu.demo.dto.request.LoginRequest;
import com.gr2.edu.demo.dto.request.UserDtoRequest;
import com.gr2.edu.demo.dto.response.LoginResponse;
import com.gr2.edu.demo.dto.response.UserDtoResponse;
import com.gr2.edu.demo.entities.Staff;
import com.gr2.edu.demo.exception.DuplicateException;
import com.gr2.edu.demo.exception.NotFoundException;
import com.gr2.edu.demo.repository.StaffRepository;
import com.gr2.edu.demo.security.JwtService;
import com.gr2.edu.demo.utils.Utils;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StaffServicce {
    @Autowired
    StaffRepository staffRepository;
    private final ModelMapper mapper = new ModelMapper();

    public List<Staff> getAll() {
        return staffRepository.findAll();
    }
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    @Value("${expire.time}")
    private long expireTime;
    public List<Staff> getAllbyRole() {
        String role = "sales";
        return staffRepository.findByRole(role);
    }

    public List<Staff> getInventoryStaff() {
        List<Staff> users = staffRepository.findByRole("INVENTORY");
        List<Staff> admins = staffRepository.findByRole("ADMIN");

        List<Staff> staffs = new ArrayList<Staff>();
        for(Staff user : users) {
            Staff staff = staffRepository.findById(user.getCode()).get();
            staffs.add(staff);

        }
        for(Staff user : admins) {
            Staff staff = staffRepository.findById(user.getCode()).get();
            staffs.add(staff);
        }
        return staffs;
    }
    public Staff getStaffLogin(String id) {
        Staff user = staffRepository.findById(id).get();
        return staffRepository.findById(user.getCode()).get();
    }
    public UserDtoResponse addStaff(UserDtoRequest staff) {
        if( Utils.isEmptyOrNull(staff.getUsername()) || Utils.isEmptyOrNull(staff.getPassword()))
            throw new NotFoundException("INVALID_DATA");
        if(staffRepository.findFirstByUsername(staff.getUsername()).isPresent()){
            throw new DuplicateException("EXIST_USER");
        }
        Staff user = mapper.map(staff, Staff.class);
        Long count = staffRepository.count();
        user.setCode("S" + count.toString());
        user.setPassword(passwordEncoder.encode(staff.getPassword()));
        return mapper.map(staffRepository.save(user), UserDtoResponse.class);

    }

    public LoginResponse login(LoginRequest loginRequest) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword());
        authenticationManager.authenticate(token);
        String jwt = jwtService.generateToken(loginRequest.getUsername());
        Optional<Staff> userOptional = staffRepository.findByUsername(loginRequest.getUsername());
        return LoginResponse.builder()
                .code(userOptional.get().getCode())
                .accessToken(jwt)
                .build();
    }

    public List<UserDtoResponse> getAllStaff() {
        List<Staff> staffs = staffRepository.findAll();
        staffs = staffs.stream().map(staff -> {
            if (!staff.getRole().equals("ADMIN")) {
                return staff;
            } else { return null;}
        }).collect(Collectors.toList());
        return Arrays.asList(mapper.map(staffs, UserDtoResponse[].class));
    }
}

