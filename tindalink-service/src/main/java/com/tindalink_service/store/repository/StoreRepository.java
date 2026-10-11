package com.tindalink_service.store.repository;

import com.tindalink_service.store.Store;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface StoreRepository extends MongoRepository<Store, String> {

    boolean existsBystoreName (String storeSlug);


}
