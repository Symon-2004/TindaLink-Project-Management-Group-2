package com.tindalink_service.order_products.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.Instant;

@Data
@Builder
public class OrderProductsResponse {

    private String id;

    private String orderId;

    private String productId;

    private String productName;

    private Integer quantity;

    private BigDecimal unitPrice;

    private BigDecimal subtotal;

    private Instant createdAt;

    private Instant updatedAt;
}


