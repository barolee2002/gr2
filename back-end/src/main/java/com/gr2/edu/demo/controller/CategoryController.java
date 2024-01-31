package com.gr2.edu.demo.controller;

import com.gr2.edu.demo.dto.category.CategoryDto;
import com.gr2.edu.demo.dto.ResponseObject;
import com.gr2.edu.demo.entities.CategoryEntity;
import com.gr2.edu.demo.service.CategoryService;
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
public class CategoryController {
    @Autowired
    private CategoryService categoryService;
//    @PostMapping("/categories")
//    public ResponseEntity<ResponseObject> save(@RequestBody CategoryDto category) {
//        categoryService.save(category);
//        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", category));
//    }
    @GetMapping("/categories")
    public List<CategoryEntity> getAllCategories() {
//        Map<String, Object> response = categoryService.getAllCategories();
//        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", response));
        return categoryService.getAll();
    }
    @GetMapping("/categories/filter")
    public ResponseEntity<ResponseObject> getCategoriesByCode(@RequestParam("code") String code) {
        Map<String, Object> response = categoryService.getCategoriesByCode(code);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ResponseObject("success", "", response));

    }

    @GetMapping("/categories/{code}")
    public CategoryEntity getByCode(@PathVariable("code") String code) {
        return categoryService.getByCode(code);
    }

    @PostMapping("/categories")
    public CategoryEntity saveCategory(@RequestBody CategoryDto categoryDto){
        return categoryService.saveCategory(categoryDto);
    }

    @PutMapping("/categories")
    public CategoryEntity updateCategory(@RequestBody CategoryEntity categoryEntity){
        return categoryService.updateCategory(categoryEntity);
    }

    @DeleteMapping("/categories/{id}")
    public void deleteCategory(@PathVariable("id") Integer id){
        categoryService.deleteCategory(id);
    }
}
