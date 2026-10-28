package com.tindalink_service.order_products.service;

import com.tindalink_service.cart.Cart;
import com.tindalink_service.common.enums.ProductStatus;
import com.tindalink_service.common.exception.BadRequestException;
import com.tindalink_service.common.exception.NotFoundException;
import com.tindalink_service.order_products.Order_Products;
import com.tindalink_service.order_products.dto.response.OrderProductsResponse;
import com.tindalink_service.order_products.repository.OrderProductsRepository;
import com.tindalink_service.product.Products;
import com.tindalink_service.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import static com.tindalink_service.order_products.constant.OrderProductsMessages.*;

@Service
@RequiredArgsConstructor
public class OrderProductsService {

    private final OrderProductsRepository orderProductsRepository;
    private final ProductRepository productRepository;

    public List<OrderProductsResponse> createFromCart(String orderId, List<Cart> cartItems){

        if(cartItems == null || cartItems.isEmpty()){
            throw new BadRequestException(ORDER_HAS_NO_ITEMS);
        }

        List<Order_Products> lines = cartItems.stream().map(item ->{
            Products products = productRepository.findById(item.getProductId())
                    .orElseThrow(()-> new NotFoundException(ORDER_PRODUCT_NOT_FOUND + item.getProductId()));

            if(products.getStatus() != ProductStatus.PUBLISHED){
                throw new BadRequestException(ORDER_PRODUCT_UNAVAILABLE + products.getName());

            }

            return Order_Products.builder()
                    .orderId(orderId)
                    .productId(products.getId())
                    .productName(products.getName())
                    .quantity(item.getQuantity())
                    .unitPrice(products.getPrice())
                    .subtotal(products.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())).setScale(2, RoundingMode.HALF_UP))
                    .build();
        }).toList();
        return orderProductsRepository.saveAll(lines).stream().map(this::toResponse).toList();

    }

    public List<OrderProductsResponse> getByOrder(String orderId){
        return orderProductsRepository.findByorderId(orderId).stream().map(this::toResponse).toList();

    }

    public OrderProductsResponse getById(String id){
        return toResponse(orderProductsRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(ORDER_PRODUCT_NOT_FOUND + id)));

    }

    public BigDecimal calculateTotal(String orderId){
        return orderProductsRepository.findByorderId(orderId).stream()
                .map(Order_Products::getSubtotal)
                .reduce(BigDecimal.ZERO,BigDecimal::add);

    }
    private OrderProductsResponse toResponse(Order_Products order_products){
        return OrderProductsResponse.builder()
                .id(order_products.getId())
                .orderId(order_products.getOrderId())
                .productId(order_products.getProductId())
                .quantity(order_products.getQuantity())
                .unitPrice(order_products.getUnitPrice())
                .subtotal(order_products.getSubtotal())
                .createdAt(order_products.getCreatedAt())
                .updatedAt(order_products.getUpdatedAt())
                .build();
    }


}
