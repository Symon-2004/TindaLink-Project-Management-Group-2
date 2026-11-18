package com.transaction_service.Order;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "order_products")
@CompoundIndex(name = "order_product_unique", def = "{'orderId': 1, 'productId': 1}", unique = true)
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor @Builder
public class Order_Products {

    @Id
    private String id;

    @Indexed
    private String orderId;

    private String productId;
    private String productName;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal subtotal;

    @CreatedDate
    private LocalDateTime createdAt;
}