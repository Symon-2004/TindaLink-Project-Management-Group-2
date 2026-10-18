package com.tindalink_service.inventory;


import com.tindalink_service.common.enums.InventoryStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "inventory")
public class Inventory implements Serializable {

    @Id
    private String Id;

    @Indexed(unique = true)
    private String productName;

    private Integer stockQuantity;

    private InventoryStatus status;

    @LastModifiedDate
    private Instant updatedAt;







}
