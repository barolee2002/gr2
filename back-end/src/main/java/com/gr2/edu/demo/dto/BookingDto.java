package com.gr2.edu.demo.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
public class BookingDto {

    @NotEmpty
    private String code;
    @NotEmpty
    private String staffName;
    @NotEmpty

    private String supplierName;
    @NotEmpty

    private BigDecimal total;
    @NotEmpty
    private LocalDate bookingDate;
    @NotEmpty
    private String bookingStatus;
    @NotNull
    private String inventoryName;
    @NotEmpty
    private List<BookingLineDto> bookinglines;





}
