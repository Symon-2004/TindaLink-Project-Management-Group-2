package com.tindalink_service.product.dto.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

import static com.tindalink_service.product.constant.ProductMessages.*;

@Data
public class ProductRequest {

    @NotBlank(message = PRODUCT_STORE_ID_REQUIRED)
    private String storeId;

    private String categoryId;

    @NotBlank(message = PRODUCT_INVENTORY_ID_REQUIRED)
    private String inventoryId;

    @NotBlank(message = PRODUCT_NAME_REQUIRED)
    @Size(max = 100, message = PRODUCT_NAME_TOO_LONG)
    private String name;

    private String description;

    @NotNull(message = PRICE_REQUIRED)
    @DecimalMin(value = "0.01", message = PRICE_INVALID)
    @Digits(integer = 8, fraction = 2)
    private BigDecimal price;

    @Size(max = 10, message = IMAGES_TOO_MANY)
    private List<String> imageUrls;
}
