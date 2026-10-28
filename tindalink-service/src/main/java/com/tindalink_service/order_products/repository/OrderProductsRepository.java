package com.tindalink_service.order_products.repository;


import com.tindalink_service.order_products.Order_Products;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface OrderProductsRepository extends MongoRepository<Order_Products,String> {

    List<Order_Products> findByorderId(String orderId);

    void deleteByOrderId(String orderId);
}
