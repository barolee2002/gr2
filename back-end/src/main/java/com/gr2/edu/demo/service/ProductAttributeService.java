package com.gr2.edu.demo.service;

import com.gr2.edu.demo.dto.ProductAttributeDto;
import com.gr2.edu.demo.dto.product.attribute.CreateProductAttribute;
import com.gr2.edu.demo.entities.ProductAttribute;
import com.gr2.edu.demo.entities.ProductEntity;
import com.gr2.edu.demo.repository.ProductAttributeRepository;
import com.gr2.edu.demo.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductAttributeService {

    @Autowired
    ProductAttributeRepository productAttributeRepository;

    private final ProductRepository productRepository;
    ModelMapper modelMapperProductAttribute = new ModelMapper();
    public List<ProductAttribute> findAllAttribute(String code){
        return productAttributeRepository.findAllByProductCodeAndStatus(code,"active");
    }
    public ProductAttribute findAllAttributeByProductNameAndSizeAndName(String name, String size, String color, String inventoryName) {
        String searchInventoryName = null;
        if(inventoryName != "") {
            searchInventoryName = inventoryName;
        }
        ProductEntity product = productRepository.findByName(name);
        ProductAttribute attribute = productAttributeRepository.findByProductCodeAndSizeAndColorAndInventoryName(product.getCode(), size, color, searchInventoryName );

        return attribute;

    }


    //bao
    public List<String> getAllSizes() {
        return productAttributeRepository.findDistinctSize();
    }

    public List<String> getAllColors() {
        return productAttributeRepository.findDistinctColor();
    }
    //bao

    public Integer getTotalQuantity(){
        return productAttributeRepository.getTotalQuantity();
    }

    public void deleteAttribute(Integer id){
        ProductAttribute productAttribute = productAttributeRepository.findById(id).get();
        System.out.println("trc: " + productAttribute);
        productAttribute.setStatus("delete");
        System.out.println("sau: " + productAttribute);
        productAttributeRepository.save(productAttribute);
    }

    public List<CreateProductAttribute> addListProductAttributes(List<CreateProductAttribute> createProductAttributes){
        for (CreateProductAttribute createProductAttribute : createProductAttributes) {
            ProductAttribute productAttribute = new ProductAttribute();
            productAttribute.setCreateAt(LocalDate.now());
            productAttribute.setUpdateAt(null);
            productAttribute.setColor(createProductAttribute.getColor());
            productAttribute.setSize(createProductAttribute.getSize());
            productAttribute.setQuantity(0);
            productAttribute.setSold(0);
            productAttribute.setPrice(createProductAttribute.getPrice());
            productAttribute.setOriginalCost(createProductAttribute.getOriginalCost());
            productAttribute.setProductCode(createProductAttribute.getProductCode());
            productAttribute.setStatus("active");

            productAttributeRepository.save(productAttribute);
        }
        return createProductAttributes;
    }

    public List<ProductAttribute> updateListProductAttribute(List<ProductAttribute> productAttributes){
        for(ProductAttribute productAttribute : productAttributes){
            productAttributeRepository.save(productAttribute);
        }
        return productAttributes;
    }

    public ProductAttribute updateQuantity(Integer ID,Integer sold){
        ProductAttribute updateProductAttribute = productAttributeRepository.findById(ID).get();
        Integer quantity = updateProductAttribute.getQuantity() - sold;
        updateProductAttribute.setQuantity(quantity);
        updateProductAttribute.setSold(updateProductAttribute.getSold() + sold);
        productAttributeRepository.save(updateProductAttribute);
        return updateProductAttribute;
    }
    public List<ProductAttributeDto> getAttributeByProduct(String productCode, String inventoryName) {
        List<ProductAttribute> attributes = productAttributeRepository.findByProductCodeAndInventoryName(productCode, inventoryName);
        List<ProductAttributeDto> dtos = Arrays.asList(modelMapperProductAttribute.map(attributes, ProductAttributeDto[].class));
        return dtos;
    }
}
