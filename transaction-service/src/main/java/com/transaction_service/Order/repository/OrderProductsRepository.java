package com.transaction_service.Order.repository;

import com.transaction_service.Order.Order_Products;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderProductsRepository extends MongoRepository<Order_Products, String> {

    List<Order_Products> findByOrderId(String orderId);

    List<Order_Products> findByOrderIdIn(List<String> orderIds);

    void deleteByOrderId(String orderId);
}
