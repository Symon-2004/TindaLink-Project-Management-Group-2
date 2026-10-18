package com.tindalink_service.user_stores;

import com.tindalink_service.common.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "user_stores")
@CompoundIndex(name = "user_store_unique", def = "{'userId': 1, 'storeId':1}", unique = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User_Stores implements Serializable {

    @Id
    private String Id;

    private String userId;

    private String storeId;

    private Role role;
}
