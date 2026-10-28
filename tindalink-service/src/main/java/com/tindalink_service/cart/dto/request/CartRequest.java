package com.tindalink_service.cart.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import static com.tindalink_service.cart.constant.CartMessages.*;

@Data
public class CartRequest {

    @NotBlank(message = USER_ID_REQUIRED)
    private String userId;

    @NotBlank(message = PRODUCT_ID_REQUIRED)
    private String productId;

    @NotNull(message = QUANTITY_REQUIRED)
    @Min(value = 1, message = QUANTITY_INVALID)
    @Max(value = 99, message = QUANTITY_TOO_HIGH)
    private Integer quantity;
}
