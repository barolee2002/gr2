package com.gr2.edu.demo.repository;
import com.gr2.edu.demo.dto.product.ProductsWithCategory;
import com.gr2.edu.demo.entities.CategoryEntity;
import com.gr2.edu.demo.entities.ProductEntity;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Modifying;

@Repository
public interface ProductRepository extends JpaRepository<ProductEntity, String> {

    ProductEntity findByName(String name);

    Optional<ProductEntity> deleteByCode(String code);

    @Query("SELECT new com.gr2.edu.demo.dto.product.ProductsWithCategory(p.image, p.code, p.name, p.brand, c.name, p.status, p.createAt) " +
            "FROM ProductEntity p LEFT JOIN CategoryEntity c on p.categoryId = c.id " +
            "WHERE p.name LIKE %:keyword% OR p.code LIKE %:keyword%")
    List<ProductsWithCategory> searchByCodeAndName(@Param("keyword") String keyword);

    ProductEntity findByCode(String code);


    @Modifying
    @Query("SELECT p FROM ProductEntity p WHERE p.code LIKE %:code% ")
    List<ProductEntity> findByCodeContaining(String code);


    @Query("select p.name, sum(pa.quantity) as total "
            + "from ProductEntity p join ProductAttribute pa on p.code = pa.productCode "
            + "group by p.code order by total desc")
    List<Object> findTopProductsByQuantity();

    @Query("SELECT new com.gr2.edu.demo.dto.product.ProductsWithCategory(p.image, p.code, p.name, p.brand, c.name, p.status, p.createAt) " +
            "FROM ProductEntity p LEFT JOIN CategoryEntity c on p.categoryId = c.id")
    List<ProductsWithCategory> getProductsWithCategory();

    @Query("SELECT new com.gr2.edu.demo.dto.product.ProductsWithCategory(p.image, p.code, p.name, p.brand, c.name, p.status, p.createAt)  " +
            "FROM ProductEntity p LEFT JOIN CategoryEntity c on p.categoryId = c.id " +
            "WHERE c IN :categories")
    List<ProductsWithCategory> findByCategoryIn(List<CategoryEntity> categories);
    List<ProductEntity> findByCodeContainingOrNameContaining(String code, String name);

    @Query("SELECT e FROM ProductEntity e WHERE (:name IS NULL OR :name = '' OR e.name LIKE %:name%) " +
            "OR (:code IS NULL OR :code = ''  OR e.code LIKE %:code%) "
    )
    List<ProductEntity> findByCodeOrName(
            @Param("name") String name,
            @Param("code") String code
    );
    @Query("SELECT e FROM ProductEntity e ORDER BY e.code DESC LIMIT 1  ")
    Optional<ProductEntity> getLastProduct();
    List<ProductEntity> findAllByCategoryId (Integer id);
    List<ProductEntity> findAllByStatus (String status);

}
