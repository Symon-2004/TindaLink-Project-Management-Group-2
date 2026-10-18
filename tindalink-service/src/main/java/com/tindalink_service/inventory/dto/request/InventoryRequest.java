package com.tindalink_service.inventory.dto.request;

import aQute.bnd.annotation.licenses.MIT;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import static com.tindalink_service.inventory.constant.InventoryMessages.*;

@Data
public class InventoryRequest {

    @NotBlank(message = PRODUCT_NAME_REQUIRED)
    @Size(max = 50, message = PRODUCT_NAME_TOO_LONG)
    private String productName;

    @NotNull(message = STOCK_QUANTITY_REQUIRED)
    @Min(value = 0, message = STOCK_QUANTITY_NEGATIVE)
    private Integer stockQuantity;

}


