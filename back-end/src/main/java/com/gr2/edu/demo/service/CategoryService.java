package com.gr2.edu.demo.service;

import com.gr2.edu.demo.dto.category.CategoryDto;
import com.gr2.edu.demo.entities.CategoryEntity;
import com.gr2.edu.demo.entities.ProductEntity;
import com.gr2.edu.demo.exception.DuplicateException;
import com.gr2.edu.demo.exception.NotFoundException;
import com.gr2.edu.demo.repository.CategoryRepository;
import com.gr2.edu.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapperCategory;

    /**
     * Save or update storage
     * @param categoryDto
     * @return
     */
    public com.gr2.edu.demo.dto.CategoryDto save(com.gr2.edu.demo.dto.CategoryDto categoryDto) {
        CategoryEntity categoryEntity = new CategoryEntity();
        if(categoryDto.getCode() != null ){
            com.gr2.edu.demo.dto.CategoryDto finalCategoryDto = categoryDto;
            categoryEntity = categoryRepository.findByCode(categoryDto.getCode())
                    .orElseThrow(() -> new DuplicateException("Category not found with id: " + finalCategoryDto.getCode()));
            modelMapperCategory.map(categoryDto, categoryEntity);
        }else{
            categoryEntity = modelMapperCategory.map(categoryDto,CategoryEntity.class);
        }
        categoryEntity = categoryRepository.save(categoryEntity);
        return modelMapperCategory.map(categoryEntity, com.gr2.edu.demo.dto.CategoryDto.class);
    }

    /**
     * find a storage by id
     * @param code
     * @return
     */
    public com.gr2.edu.demo.dto.CategoryDto findByCode(String code) {
        CategoryEntity categoryEntity = categoryRepository.findByCode(code)
                .orElseThrow(() -> new NotFoundException("Storage not found with code: " + code));
        return modelMapperCategory.map(categoryEntity, com.gr2.edu.demo.dto.CategoryDto.class);
    }
    /**
     * Find all storage by code
     * @return
     */
    public Map<String, Object> getCategoriesByCode(String code) {
        List<CategoryEntity> categories = new ArrayList<CategoryEntity>();
        categories = categoryRepository.findByCodeContaining(code);
        if(categories.isEmpty()) {
            throw new NotFoundException("Storage not found with code: " + code);

        }
        Map<String, Object> response = new HashMap<>();
        List<com.gr2.edu.demo.dto.CategoryDto> categoryDto = Arrays.asList(modelMapperCategory.map(categories, com.gr2.edu.demo.dto.CategoryDto[].class));
        response.put("categories", categoryDto);

        return response;

    }

    /**
     * Find all storage
     * @return
     */
    public Map<String, Object> getAllCategories() {
        List<CategoryEntity> categories = new ArrayList<CategoryEntity>();
        categories = categoryRepository.findAll();
        // Mapping qua Dto
        Map<String, Object> response = new HashMap<>();
        List<com.gr2.edu.demo.dto.CategoryDto> categoryDto = Arrays.asList(modelMapperCategory.map(categories, com.gr2.edu.demo.dto.CategoryDto[].class));
        response.put("categories", categoryDto);

        return response;
    }

    public List<CategoryEntity> getAll(){
        return categoryRepository.findAll();
    }

    public CategoryEntity getByCode(String code) {
        return categoryRepository.findByCode(code).get();
    }

    public CategoryEntity saveCategory (CategoryDto categoryDto){
        Integer maxId = 0;

        if (categoryRepository.findMaxCategoryId() != null) {
            maxId = categoryRepository.findMaxCategoryId();
        }
        Integer id = maxId + 1;
        String code = null;
        if(maxId < 10)
            code = "C00" + id;
        else if(id >= 10 && id < 100)
            code = "C0" + id;
        else
            code = "C" + id;
        CategoryEntity categoryEntity = new CategoryEntity();
        categoryEntity.setCode(code);
        categoryEntity.setName(categoryDto.getName());
        categoryEntity.setDescription(categoryDto.getDescription());
        categoryEntity.setCreateAt(LocalDate.now());
        return categoryRepository.save(categoryEntity);
    }

    public CategoryEntity updateCategory(CategoryEntity categoryEntity){
        return categoryRepository.save(categoryEntity);
    }

    public void deleteCategory(Integer id){
        CategoryEntity categoryEntity = categoryRepository.findById(id).get();
        List<ProductEntity> productEntities = productRepository.findAllByCategoryId(id);
        for(ProductEntity productEntity : productEntities){
            productEntity.setCategoryId(null);
            productRepository.save(productEntity);
        }
//        categoryRepository.delete(categoryEntity.getId());
        categoryRepository.deleteById(id);
    }
}
