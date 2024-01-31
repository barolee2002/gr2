package com.gr2.edu.demo.controller;


import com.gr2.edu.demo.dto.InventoryDto;
import com.gr2.edu.demo.dto.ResponseObject;

import com.gr2.edu.demo.service.InventoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping("/admin/inventory")
@CrossOrigin(origins = "http://localhost:3000")
public class InventoryController {
    @Autowired
    private InventoryService inventoryService;
    @PostMapping("/inventories")
    public ResponseEntity<ResponseObject> save(@RequestBody InventoryDto inventory) {
        inventoryService.save(inventory);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", inventory));
    }
    @GetMapping("/inventories")
    public List<InventoryDto> getAllInventories() {
        return inventoryService.getAll();
    }
}
