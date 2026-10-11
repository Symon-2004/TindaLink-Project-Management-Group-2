package com.tindalink_service.user_stores.repository;

import com.tindalink_service.user_stores.User_Stores;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface User_StoreRepository extends MongoRepository<User_Stores, String> {

    boolean existsByUserIdAndStoreId(String userId, String store);

    List<User_Stores> findByUserId(String userId);

    List<User_Stores> findByStoreId(String storeId);
}
