package com.tindalink_service.inventory.dto.response;

import com.tindalink_service.common.enums.InventoryStatus;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class InventoryResponse {

    private String Id;

    private String productName;

    private Integer StockQuantity;

    private InventoryStatus status;

    private Instant updatedAt;



}
