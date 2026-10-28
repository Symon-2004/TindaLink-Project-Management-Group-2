package com.tindalink_service.cart.dto.response;

import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class CartResponse {

    private String userId;
    private List<CartItemResponse> items;
    private int totalItems;
    private BigDecimal total;
}
