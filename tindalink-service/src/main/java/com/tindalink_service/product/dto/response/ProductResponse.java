package com.tindalink_service.product.dto.response;

import com.tindalink_service.common.enums.ProductStatus;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Data
@Builder
public class ProductResponse {

    private String id;

    private String storeId;

    private String categoryId;

    private String inventoryId;

    private String name;

    private String description;

    private BigDecimal price;

    private List<String> imageUrls;

    private ProductStatus status;

    private Instant createdAt;   // Instant, not String

    private Instant updatedAt;
}
