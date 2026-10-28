package com.tindalink_service.cart.repository;

import com.tindalink_service.cart.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.*;

public interface CartRepository extends MongoRepository<Cart, String> {

    Optional<Cart> findByUserIdAndProductId(String userId, String productId);

    List<Cart> findByUserId(String userId);

    void deleteByUserId(String userId);
}