package com.tindalink_service.category.dto.response;

import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class CategoryResponse {

    private String Id;

    private String storeId;

    private String categoryName;

    private String description;

    private Instant createdAt;

    private Instant updatedAt;

}
