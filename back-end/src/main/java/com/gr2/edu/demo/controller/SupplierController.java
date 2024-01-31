package com.gr2.edu.demo.controller;

import com.gr2.edu.demo.dto.ResponseObject;
import com.gr2.edu.demo.dto.SupplierDto;
import com.gr2.edu.demo.entities.SupplierEntity;
import com.gr2.edu.demo.service.SupplierService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@Validated
@RequestMapping("/admin/inventory")
@CrossOrigin(origins = "http://localhost:3000")
public class SupplierController {
    @Autowired
    private SupplierService supplierService;
    @PostMapping("/Suppliers")
    public ResponseEntity<ResponseObject> save(@RequestBody SupplierDto supplier) {
        supplierService.save(supplier);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", supplier));
    }
    @GetMapping("/suppliers")
    public List<SupplierEntity> getAllSuppliers() {
        return supplierService.getAll();
    }
    @GetMapping("/Suppliers/code")
    public ResponseEntity<ResponseObject> getSupplierByCode(@RequestParam("code") String code) {
        Map<String, Object> response = supplierService.getSuppliersByCode(code);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", response));

    }
    @GetMapping("/suppliers/name")
    public SupplierDto getByName(@RequestParam("name") String name) {
        SupplierDto supplierDto = supplierService.getByName(name);
        return supplierDto;
    }
}
