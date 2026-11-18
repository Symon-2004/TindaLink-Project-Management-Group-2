package com.transaction_service.Order.repository;
import com.transaction_service.common.enums.OrderStatus;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import com.transaction_service.Order.Order;
import com.transaction_service.common.enums.OrderStatus;
public interface OrderRepository extends MongoRepository<Order, String> {

    List<Order> findByUserIdOrderByCreatedAtDesc(String userId);

    List<Order> findByStoreIdOrderByCreatedAtDesc(String storeId);

    List<Order> findByStoreIdAndOrderStatusOrderByCreatedAtDesc(String storeId, OrderStatus orderStatus);


}
