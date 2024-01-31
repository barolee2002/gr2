package com.gr2.edu.demo.security;

import com.gr2.edu.demo.entities.Staff;
import com.gr2.edu.demo.exception.NotFoundException;
import com.gr2.edu.demo.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final StaffRepository userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Staff> userOptional = userRepo.findByUsername(username);
        if( userOptional.isPresent())
            return new org.springframework.security.core.userdetails.User(username, userOptional.get().getPassword(), new ArrayList<>());
        else
            throw new NotFoundException("Errors.USER_NOT_FOUND");
    }
}