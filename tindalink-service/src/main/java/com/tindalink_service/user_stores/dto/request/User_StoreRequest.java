package com.tindalink_service.user_stores.dto.request;

import com.tindalink_service.common.enums.Role;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class User_StoreRequest {

    @NotBlank(message = "User id is required")
    private String userId;

    @NotBlank(message = "StoreId is required")
    private String storeId;

    @NotBlank(message = "Role is Required")
    private Role role;
}
