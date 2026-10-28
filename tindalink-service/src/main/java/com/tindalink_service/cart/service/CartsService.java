package com.tindalink_service.cart.service;

import com.tindalink_service.cart.Cart;
import com.tindalink_service.cart.dto.request.CartQuantityRequest;
import com.tindalink_service.cart.dto.request.CartRequest;
import com.tindalink_service.cart.dto.response.CartItemResponse;
import com.tindalink_service.cart.dto.response.CartResponse;
import com.tindalink_service.cart.repository.CartRepository;
import com.tindalink_service.common.enums.ProductStatus;
import com.tindalink_service.common.exception.BadRequestException;
import com.tindalink_service.common.exception.NotFoundException;
import com.tindalink_service.inventory.Inventory;
import com.tindalink_service.inventory.repository.InventoryRepository;
import com.tindalink_service.product.Products;
import com.tindalink_service.product.repository.ProductRepository;
import com.tindalink_service.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import static com.tindalink_service.cart.constant.CartMessages.*;
import static com.tindalink_service.inventory.constant.InventoryMessages.INVENTORY_NOT_FOUND;
import static com.tindalink_service.product.constant.ProductMessages.PRODUCT_NOT_FOUND;
import static com.tindalink_service.user.constant.UserMessages.USER_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class CartsService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final InventoryRepository inventoryRepository;
    private final UserRepository userRepository;

    public CartItemResponse addItem(CartRequest request){

        if(!userRepository.existsById(request.getUserId())){

            throw new NotFoundException(USER_NOT_FOUND + request.getUserId());
        }

        Products products = productRepository.findById(request.getProductId())

                .orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND + request.getProductId()));

        if(products.getStatus() != ProductStatus.PUBLISHED){

            throw new BadRequestException(PRODUCT_NOT_AVAILABLE);

        }

        Cart item = cartRepository.findByUserIdAndProductId(request.getUserId(), request.getProductId())
                .orElseGet(()-> Cart.builder()
                        .userId(request.getUserId())
                        .productId(products.getId())
                        .quantity(0)
                        .build());

        int newQuantity = item.getQuantity() + request.getQuantity();
        checkStock(products,newQuantity);

        item.setProductName(products.getName());
        item.setUnitPrice(products.getPrice());
        item.setQuantity(newQuantity);
        item.setSubtotal(calculateSubtotal(products.getPrice(), newQuantity));

        return toItemResponse(cartRepository.save(item));
    }


    public CartResponse getCart(String userId){

        List<CartItemResponse> items = cartRepository.findByUserId(userId).stream().map(this::toItemResponse).toList();

        BigDecimal total = items.stream().map(CartItemResponse::getSubtotal).reduce(BigDecimal.ZERO,BigDecimal::add);

        return CartResponse.builder()
                .userId(userId)
                .items(items)
                .totalItems(items.stream().mapToInt(CartItemResponse::getQuantity).sum())
                .total(total)
                .build();

    }

    public CartItemResponse updateQuantity(String Id, CartQuantityRequest request){

        Cart item = cartRepository.findById(Id).orElseThrow(() -> new NotFoundException(CART_ITEM_NOT_FOUND + Id));

        Products products = productRepository.findById(item.getProductId()).orElseThrow(() -> new NotFoundException(PRODUCT_NOT_FOUND + item.getProductId()));

        if(products.getStatus() != ProductStatus.PUBLISHED){

            throw new BadRequestException(PRODUCT_NOT_AVAILABLE);

        }
        checkStock(products,request.getQuantity());

        item.setQuantity(request.getQuantity());
        item.setUnitPrice(products.getPrice());
        item.setProductName(products.getName());
        item.setSubtotal(calculateSubtotal(products.getPrice(), request.getQuantity()));

        return toItemResponse(cartRepository.save(item));

    }

    public void removeItem(String Id){

        if(!cartRepository.existsById(Id)){

            throw new NotFoundException(CART_ITEM_NOT_FOUND + Id);
        }
        cartRepository.deleteById(Id);

    }

    public void clearCart(String userId){
        cartRepository.deleteByUserId(userId);
    }

    private void checkStock(Products products, int quantity){

        Inventory inventory = inventoryRepository.findById(products.getInventoryId()).orElseThrow(() -> new NotFoundException(INVENTORY_NOT_FOUND + products.getInventoryId()));

        if(quantity > inventory.getStockQuantity()){
            throw new BadRequestException(QUANTITY_EXCEEDS_STOCK + inventory.getStockQuantity());

        }
    }

    private BigDecimal calculateSubtotal(BigDecimal unitPrice, int quantity){

        return unitPrice.multiply(BigDecimal.valueOf(quantity)).setScale(2, RoundingMode.HALF_UP);


    }

    private CartItemResponse toItemResponse(Cart cart){
        return CartItemResponse.builder()
                .Id(cart.getId())
                .productId(cart.getProductId())
                .productName(cart.getProductName())
                .quantity(cart.getQuantity())
                .unitPrice(cart.getUnitPrice())
                .subtotal(cart.getSubtotal())
                .build();
    }

}