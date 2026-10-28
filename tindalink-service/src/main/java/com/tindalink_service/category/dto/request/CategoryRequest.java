package com.tindalink_service.category.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

import static com.tindalink_service.category.constant.CategoryMessages.*;

@Data
public class CategoryRequest {

    @NotBlank(message = STORE_ID_REQUIRED)
    private String storeId;

    @NotBlank(message = CATEGORY_NAME_REQUIRED)
    @Size(max = 100, message = CATEGORY_NAME_TOO_LONG)
    private String CategoryName;

    private String description;




}