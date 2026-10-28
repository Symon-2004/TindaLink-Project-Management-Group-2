package com.tindalink_service.product.service;

import com.tindalink_service.category.Category;
import com.tindalink_service.category.dto.request.CategoryRequest;
import com.tindalink_service.category.repository.CategoryRepository;
import com.tindalink_service.common.enums.ProductStatus;
import com.tindalink_service.common.exception.BadRequestException;
import com.tindalink_service.common.exception.NotFoundException;
import com.tindalink_service.inventory.repository.InventoryRepository;
import com.tindalink_service.product.Products;
import com.tindalink_service.product.dto.request.ProductRequest;
import com.tindalink_service.product.dto.response.ProductResponse;
import com.tindalink_service.product.repository.ProductRepository;
import com.tindalink_service.store.repository.StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.tindalink_service.product.constant.ProductMessages.*;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;
    private final StoreRepository storeRepository;
    private final CategoryRepository categoryRepository;

    public ProductResponse create(ProductRequest request) {
        validateReferences(request);

        String name = request.getName().trim();

        if (productRepository.existsByStoreIdAndName(request.getStoreId(), name)) {
            throw new BadRequestException(PRODUCT_ALREADY_EXIST + name);
        }

        Products saved = productRepository.save(
                Products.builder()
                        .storeId(request.getStoreId())
                        .categoryId(request.getCategoryId())
                        .inventoryId(request.getInventoryId())
                        .name(name)
                        .description(request.getDescription())
                        .price(request.getPrice())
                        .imageUrls(request.getImageUrls())
                        .build()
        );
        return toResponse(saved);

    }
    public List<ProductResponse> getByStore(String storeId, ProductStatus status) {

        List<Products> products = (status == null) ? productRepository.findByStoreId(storeId) : productRepository.findByStoreIdAndStatus(storeId, status);

        return products.stream().map(this::toResponse).toList();
    }


    public ProductResponse getById(String Id){

        return toResponse(findOrThrow(Id));
    }


    public ProductResponse update(String Id, ProductRequest request) {

        Products product = findOrThrow(Id);

        if (!product.getStoreId().equals(request.getStoreId())) {

        }
        validateReferences(request);

        String name = request.getName().trim();

        if (productRepository.existsByStoreIdAndName(request.getStoreId(), name)) {
            throw new BadRequestException(PRODUCT_ALREADY_EXIST + name);
        }
        product.setCategoryId(request.getCategoryId());
        product.setInventoryId(request.getInventoryId());
        product.setName(name);
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setImageUrls(request.getImageUrls());

        return toResponse(productRepository.save(product));
    }

    public ProductResponse publish(String id) {
        Products product = findOrThrow(id);

        if (product.getStatus() == ProductStatus.PUBLISHED) {
            throw new BadRequestException(PRODUCT_ALREADY_PUBLISHED);
        }
        if (product.getImageUrls() == null || product.getImageUrls().isEmpty()) {
            throw new BadRequestException(PRODUCT_NEEDS_IMAGE);
        }

        product.setStatus(ProductStatus.PUBLISHED);
        Products saved = productRepository.save(product);

        // TODO: publish ProductPublishedEvent here once RabbitMQ is set up (Instagram cross-post)

        return toResponse(saved);

   }

    public ProductResponse archive(String id) {

        Products product = findOrThrow(id);

        product.setStatus(ProductStatus.ARCHIVED);

        return toResponse(productRepository.save(product));
    }

    public void delete(String id) {

        if (!productRepository.existsById(id)) {

            throw new NotFoundException(PRODUCT_NOT_FOUND + id);
        }
        productRepository.deleteById(id);
    }

    private void validateReferences(ProductRequest request) {
        if (!storeRepository.existsById(request.getStoreId())) {
            throw new NotFoundException("Store not found: " + request.getStoreId());
        }
        if (!inventoryRepository.existsById(request.getInventoryId())) {
            throw new NotFoundException("Inventory item not found: " + request.getInventoryId());
        }
        if (request.getCategoryId() != null && !request.getCategoryId().isBlank()) {

            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new NotFoundException("Category not found: " + request.getCategoryId()));

            if (!category.getStoreId().equals(request.getStoreId())) {

                throw new BadRequestException(CATEGORY_STORE_MISMATCH);
            }
        }
    }

    private Products findOrThrow(String id) {

        return productRepository.findById(id)

                .orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND + id));
    }

    private ProductResponse toResponse(Products products) {

        return ProductResponse.builder()
                .id(products.getId())
                .storeId(products.getStoreId())
                .categoryId(products.getCategoryId())
                .inventoryId(products.getInventoryId())
                .name(products.getName())
                .description(products.getDescription())
                .price(products.getPrice())
                .imageUrls(products.getImageUrls())
                .status(products.getStatus())
                .createdAt(products.getCreatedAt())
                .updatedAt(products.getUpdatedAt())
                .build();
    }


}

