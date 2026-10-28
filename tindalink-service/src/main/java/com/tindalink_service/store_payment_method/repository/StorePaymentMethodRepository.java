package com.tindalink_service.store_payment_method.repository;

import com.tindalink_service.common.enums.PaymentProvider;
import com.tindalink_service.store_payment_method.StorePaymentMethod;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface StorePaymentMethodRepository extends MongoRepository<StorePaymentMethod, String> {

    boolean existsByStoreIdAndProvider(String storeId, PaymentProvider provider);

    List<StorePaymentMethod> findByStoreId(String storeId);

    void deleteBystoreId(String storeId);

}
