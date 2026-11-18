package com.transaction_service.Order;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.transaction_service.common.enums.OrderPaymentMethod;
import com.transaction_service.common.enums.OrderStatus;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.CompoundIndexes;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "order")
@CompoundIndexes({
        @CompoundIndex(name = "store_status_created_idx", def = "{'storeId': 1, 'orderStatus': 1, 'createdAt': -1}"),
        @CompoundIndex(name = "user_created_idx", def = "{'userId': 1, 'createdAt': -1}")
})
@Data
@NoArgsConstructor @AllArgsConstructor @Builder
public class Order {

    @Id
    private String id;

    private String storeId;
    private String userId;
    private String shippingAddress;

    private BigDecimal subtotal;
    private BigDecimal shippingFee;
    private BigDecimal totalAmount;

    private OrderPaymentMethod paymentMethod;
    private OrderStatus orderStatus;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}