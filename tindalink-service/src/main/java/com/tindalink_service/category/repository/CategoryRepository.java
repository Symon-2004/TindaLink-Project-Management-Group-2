package com.tindalink_service.category.repository;

import com.tindalink_service.category.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CategoryRepository extends MongoRepository<Category, String> {

    boolean existsByStoreIdAndCategoryName(String storeId, String categoryName);

    List<Category> findByStoreId(String StoreId);
}
