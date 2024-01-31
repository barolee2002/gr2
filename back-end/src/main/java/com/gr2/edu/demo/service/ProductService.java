package com.gr2.edu.demo.service;

import com.gr2.edu.demo.dto.product.CreateProduct;
import com.gr2.edu.demo.dto.product.ProductsWithCategory;
import com.gr2.edu.demo.entities.CategoryEntity;
import com.gr2.edu.demo.entities.ProductAttribute;
import com.gr2.edu.demo.entities.ProductEntity;
import com.gr2.edu.demo.repository.CategoryRepository;
import com.gr2.edu.demo.repository.ProductAttributeRepository;
import com.gr2.edu.demo.repository.ProductRepository;
import com.gr2.edu.demo.dto.ProductDto;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import static java.time.LocalDate.now;

@Service
public class ProductService {
    @Autowired
    CategoryRepository categoryRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    ProductAttributeService attributeService;
    @Autowired
    ProductAttributeRepository productAttributeRepository;
    @Autowired
    ModelMapper modelMapperProduct = new ModelMapper();
    public void delete(String code){
        productRepository.deleteByCode(code);
    }

    public ProductService(CategoryRepository categoryRepository, ProductRepository productRepository,ProductAttributeRepository productAttributeRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.productAttributeRepository = productAttributeRepository;
    }

    public Page<ProductEntity> getAllInPage(Integer page, Integer size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepository.findAll(pageable);
    }

    public List<ProductsWithCategory> getProductsBySearch(String keyword){
        List<ProductsWithCategory> products = productRepository.searchByCodeAndName(keyword);
        return products;
    }
    public List<ProductDto> getProductsByCodeOrName(String keyword){
        List<ProductEntity> products = productRepository.findByCodeContainingOrNameContaining(keyword,keyword);
        List<ProductDto> productDtos = new ArrayList<ProductDto>();
        productDtos = Arrays.asList(modelMapperProduct.map(products, ProductDto[].class));
        for(ProductDto product : productDtos) {
            CategoryEntity category = categoryRepository.findById(product.getCategoryId()).get();
            product.setCategoryName(category.getName());
        }
        return productDtos;
    }

    public ProductEntity saveProduct(CreateProduct p) {
        ProductEntity productEntity = new ProductEntity();
        Long count = productRepository.count();
        count = count + 1;

        Optional<ProductEntity> lastProduct = productRepository.getLastProduct();
        String lastCode = lastProduct.get().getCode();
        String numericPart = lastCode.replaceAll("[^0-9]", "");
        int number = Integer.parseInt(numericPart);
        String code = "P" + (number + 1);
        productEntity.setCode(code);
        productEntity.setName(p.getName());
        productEntity.setBrand(p.getBrand());
        productEntity.setImage(p.getImage());
        productEntity.setCategoryId(p.getCategoryId());
        productEntity.setDescription(p.getDescription());
        productEntity.setCreateAt(now());
        productEntity.setStatus("active");
        return productRepository.save(productEntity);
    }

    public List<ProductDto> getAllProductsByCode(String code,String inventory){
        List<ProductEntity> products = productRepository.findByCodeContaining(code);
        List<ProductDto> productDtos = new ArrayList<ProductDto>();
        for(ProductEntity product : products) {

            List<ProductAttribute> attributes = productAttributeRepository.findByProductCodeAndInventoryName(product.getCode(),inventory);

            List<ProductDto> Dtos = Arrays.asList(modelMapperProduct.map(attributes,ProductDto[].class));

        }
        return productDtos;
    }
    public List<ProductDto> searchProductBySearchStringAndInventoryName(String searchString,String inventoryName){
        String searchProduct = null;
        String searchInventoryName = null;
        if(searchString != null) {
            searchProduct =searchString;
        }
        if(inventoryName!= null) {
            searchInventoryName =inventoryName;
        }
        List<ProductEntity> products = productRepository.findByCodeOrName(searchProduct,searchProduct);
        List<ProductDto> productDtos = Arrays.asList(modelMapperProduct.map(products, ProductDto[].class));
        productDtos = productDtos.stream().map(product -> {
            if(attributeService.getAttributeByProduct(product.getCode(), inventoryName).size() > 0) {
                product.setAttributes(attributeService.getAttributeByProduct(product.getCode(), inventoryName));
                return product;
            } else {
                return null;
            }
        }).collect(Collectors.toList());
        return productDtos;
    }
    public List<ProductDto> getAllProductByInventory(String inventoryName) {
        List<ProductAttribute> attributes = productAttributeRepository.findByInventoryName(inventoryName);
        List<ProductDto> productDtos = new ArrayList<ProductDto>();
        for(ProductAttribute attribute : attributes) {
            ProductEntity productEntity = productRepository.findByCode(attribute.getProductCode());
            ProductDto productDto = modelMapperProduct.map(productEntity,ProductDto.class);
            productDtos.add(productDto);
        }
        return productDtos;
    }

    public List<Object> getTop3ProductByQuantity() {
        List<Object> response = productRepository.findTopProductsByQuantity();
        response = response.stream().limit(3).collect(Collectors.toList());
        return response;
    }

    public ProductEntity updateProduct(ProductEntity productEntity){
        productEntity.setUpdateAt(now());
        return productRepository.save(productEntity);
    }

    public ProductEntity getProductByCode(String code){
        return productRepository.findByCode(code);
    }

    public List<ProductDto> getProductsWithCategory(){
        List<ProductEntity> products = productRepository.findAllByStatus("active");
        List<ProductDto> productDtos = Arrays.asList(modelMapperProduct.map(products, ProductDto[].class));
        for(int i = 0; i < products.size(); i++){
            CategoryEntity category = categoryRepository.findById(products.get(i).getCategoryId()).get();
            productDtos.get(i).setCategoryName(category.getName());
        }
        return productDtos;
    }

    public List<ProductsWithCategory> filterByCategory(List<CategoryEntity> categoryEntities){
        return productRepository.findByCategoryIn(categoryEntities);
    }

    public void deleteProduct(String code){
        ProductEntity productEntity = productRepository.findByCode(code);
        productEntity.setStatus("delete");
        List<ProductAttribute> productAttributes = productAttributeRepository.findByProductCode(code);
        for(ProductAttribute productAttribute : productAttributes){
            productAttribute.setStatus("delete");
            productAttributeRepository.save(productAttribute);
        }
    }
}

