package com.gr2.edu.demo.repository;

import com.gr2.edu.demo.entities.ProductAttribute;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductAttributeRepository extends JpaRepository<ProductAttribute, Integer> {

    @Query("SELECT DISTINCT p.size FROM ProductAttribute p")
    List<String> findDistinctSize();

    List<ProductAttribute> findDistinctByInventoryName(String inventoryName);

    List<ProductAttribute> findByProductCodeAndInventoryName(String code,String inventoryName);

    @Query("select sum(quantity) from ProductAttribute ")
    Integer getTotalQuantity();

    List<ProductAttribute> findByProductCode(String code);
    List<ProductAttribute> findAllByProductCodeAndStatus(String code, String status);
    List<ProductAttribute> findByProductCodeIgnoreCase(String code);
    ProductAttribute findByProductCodeAndSizeAndColorAndInventoryName(String code, String size, String color, String inventoryName);

    @Query("SELECT DISTINCT p.color FROM ProductAttribute p")
    List<String> findDistinctColor();
    List<ProductAttribute> findByInventoryName(String inventoryName);

}
