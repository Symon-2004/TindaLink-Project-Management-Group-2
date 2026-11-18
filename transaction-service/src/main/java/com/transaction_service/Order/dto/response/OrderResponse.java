package com.transaction_service.Order.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.transaction_service.Order.Order;
import com.transaction_service.Order.Order_Products;
import com.transaction_service.common.enums.OrderPaymentMethod;
import com.transaction_service.common.enums.OrderStatus;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class OrderResponse {

    private String id;
    private String storeId;
    private String userId;
    private String shippingAddress;
    private BigDecimal subtotal;
    private BigDecimal shippingFee;
    private BigDecimal totalAmount;
    private OrderPaymentMethod paymentMethod;
    private OrderStatus orderStatus;
    private List<Item> items;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    @Data
    @Builder
    public static class Item {
        private String id;
        private String productId;
        private String productName;
        private Integer quantity;
        private BigDecimal unitPrice;
        private BigDecimal subtotal;
    }

    public static OrderResponse toResponse(Order order, List<Order_Products> lines) {

        if (Objects.isNull(order)) return null;

        List<Item> items = (lines == null ? List.<Order_Products>of() : lines).stream()
                .map(l -> Item.builder()
                        .id(l.getId())
                        .productId(l.getProductId())
                        .productName(l.getProductName())
                        .quantity(l.getQuantity())
                        .unitPrice(l.getUnitPrice())
                        .subtotal(l.getSubtotal())
                        .build())
                .toList();

        return OrderResponse.builder()
                .id(order.getId())
                .storeId(order.getStoreId())
                .userId(order.getUserId())
                .shippingAddress(order.getShippingAddress())
                .subtotal(order.getSubtotal())
                .shippingFee(order.getShippingFee())
                .totalAmount(order.getTotalAmount())
                .paymentMethod(order.getPaymentMethod())
                .orderStatus(order.getOrderStatus())
                .items(items)
                .createdAt(order.getCreatedAt())
                .updatedAt(order.getUpdatedAt())
                .build();
    }
}