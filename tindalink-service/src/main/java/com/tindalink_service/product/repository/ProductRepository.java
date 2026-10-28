package com.tindalink_service.product.repository;

import com.tindalink_service.common.enums.ProductStatus;
import com.tindalink_service.product.Products;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Products, String> {

    boolean existsByStoreIdAndName(String storeId, String name);

    boolean existsByCategoryId(String categoryId);

    List<Products> findByStoreId(String storeId);

    List<Products> findByStoreIdAndStatus(String storeId, ProductStatus status);
}
