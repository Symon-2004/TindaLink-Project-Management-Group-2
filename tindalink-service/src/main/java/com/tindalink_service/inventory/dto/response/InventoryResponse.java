package com.tindalink_service.inventory.dto.response;

import com.tindalink_service.common.enums.InventoryStatus;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class InventoryResponse {

    private String id;

    private String productName;

    private Integer stockQuantity;

    private InventoryStatus status;

    private Instant updatedAt;



}
