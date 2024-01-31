package com.gr2.edu.demo.dto.response;

import com.gr2.edu.demo.entities.Customer;
import lombok.Data;

@Data
public class CustumerResponse {
   private String message;

   private Customer customer;

   public CustumerResponse() {
   }
}
