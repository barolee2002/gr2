package com.gr2.edu.demo.controller;

import com.gr2.edu.demo.dto.BookingLineDto;
import com.gr2.edu.demo.service.BookingLineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/admin/inventory")
@CrossOrigin(origins = "http://localhost:3000")

public class BookingLineController {
    @Autowired
    private BookingLineService bookingLineService;
    @GetMapping("/booking-line")
    public List<BookingLineDto> getAllCheckLineByCode(
            @RequestParam("code") String code
    ) {
        List<BookingLineDto> response = bookingLineService.getCheckLineByCode(code);
        return response;
    }
}
