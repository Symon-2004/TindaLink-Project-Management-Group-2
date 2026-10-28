package com.tindalink_service.category.service;

import com.tindalink_service.category.Category;
import com.tindalink_service.category.dto.request.CategoryRequest;
import com.tindalink_service.category.dto.response.CategoryResponse;
import com.tindalink_service.category.repository.CategoryRepository;
import com.tindalink_service.common.exception.BadRequestException;
import com.tindalink_service.common.exception.NotFoundException;
import com.tindalink_service.product.repository.ProductRepository;
import com.tindalink_service.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.tindalink_service.category.constant.CategoryMessages.*;
import static com.tindalink_service.store.constant.StoreMessages.STORE_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final StoreRepository storeRepository;
    public final ProductRepository productRepository;

    public CategoryResponse create (CategoryRequest request) {

        if (!storeRepository.existsById(request.getStoreId())) {
            throw new NotFoundException(STORE_NOT_FOUND + request.getStoreId());
        }
        String name = request.getCategoryName().trim();

        if (categoryRepository.existsByStoreIdAndCategoryName(request.getStoreId(), name)) {
            throw new BadRequestException(CATEGORY_ALREADY_EXIST + name);

        }
        Category saved = categoryRepository.save(
                Category.builder()
                        .storeId(request.getStoreId())
                        .categoryName(name)
                        .description(request.getDescription())
                        .build()
        );
        return toResponse(saved);
    }

    public List<CategoryResponse> getByStore(String storeId) {
        return categoryRepository.findByStoreId(storeId).stream().map(this::toResponse).toList();

    }

    public CategoryResponse update(String id, CategoryRequest request) {
        Category category = findOrThrow(id);
        String name = request.getCategoryName().trim();

        if(!category.getCategoryName().equals(name)

            && categoryRepository.existsByStoreIdAndCategoryName(category.getStoreId(), name)){

            throw new BadRequestException(CATEGORY_ALREADY_EXIST + name);

        }

        category.setCategoryName(name);
        category.setDescription(request.getDescription());

        return toResponse(categoryRepository.save(category));
    }

    public void delete(String id) {
        if (!categoryRepository.existsById(id)) {
            throw new NotFoundException(CATEGORY_NOT_FOUND + id);
        }
        if(productRepository.existsById(id)){
            throw new BadRequestException(CATEGORY_HAS_PRODUCTS);
        }
        categoryRepository.deleteById(id);
    }

    private Category findOrThrow(String id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(CATEGORY_NOT_FOUND + id));
    }

    private CategoryResponse toResponse(Category category){

        return CategoryResponse.builder()
                .Id(category.getId())
                .storeId(category.getStoreId())
                .categoryName(category.getCategoryName())
                .description(category.getDescription())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .build();
    }


}
