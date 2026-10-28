package com.tindalink_service.cart.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import static com.tindalink_service.cart.constant.CartMessages.*;

@Data
public class CartQuantityRequest {

    @NotNull(message = QUANTITY_REQUIRED)
    @Min(value = 1, message = QUANTITY_INVALID)
    @Max(value = 99, message = QUANTITY_TOO_HIGH)
    private Integer quantity;
}
