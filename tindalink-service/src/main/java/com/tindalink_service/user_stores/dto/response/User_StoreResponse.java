package com.tindalink_service.user_stores.dto.response;

import com.tindalink_service.common.enums.Role;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class User_StoreResponse {

    private String id;

    private String userId;

    private String storeId;

    private Role role;


}
