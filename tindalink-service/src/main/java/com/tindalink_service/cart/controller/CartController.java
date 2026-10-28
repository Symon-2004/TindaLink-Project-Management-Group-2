package com.tindalink_service.cart.controller;

import com.tindalink_service.cart.dto.request.CartQuantityRequest;
import com.tindalink_service.cart.dto.request.CartRequest;
import com.tindalink_service.cart.dto.response.CartItemResponse;
import com.tindalink_service.cart.dto.response.CartResponse;
import com.tindalink_service.cart.service.CartsService;
import com.tindalink_service.common.utils.LoggerUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

import static com.tindalink_service.cart.constant.CartMessages.*;
import static com.tindalink_service.common.utils.LoggerUtils.PROCESSING;

@Slf4j
@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
public class CartController {

    private final CartsService cartsService;

    @PostMapping
    public ResponseEntity<CartItemResponse> addItem(@Valid @RequestBody CartRequest request){

        log.info(LoggerUtils.formatProcess(PROCESSING, ADDING_TO_CART));

        return ResponseEntity.status(HttpStatus.CREATED).body(cartsService.addItem(request));


    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<CartResponse> getCart(@PathVariable String userId){

        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_CART));

        return ResponseEntity.ok(cartsService.getCart(userId));

    }

    @PatchMapping("/{id}")
    public ResponseEntity<CartItemResponse> updateQuantity(@PathVariable String Id, @Valid @RequestBody CartQuantityRequest request) {

        log.info(LoggerUtils.formatProcess(PROCESSING, UPDATING_CART_ITEM));

        return ResponseEntity.ok(cartsService.updateQuantity(Id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> removeItem (@PathVariable String Id){

        log.info(LoggerUtils.formatProcess(PROCESSING, REMOVING_CART_ITEM));

        cartsService.removeItem(Id);

        return ResponseEntity.ok(Map.of("message", CART_ITEM_REMOVED));

    }
    public ResponseEntity<Map<String, String>> clearCart (@PathVariable String userId){

        log.info(LoggerUtils.formatProcess(PROCESSING, CLEARING_CART));

        cartsService.clearCart(userId);

        return ResponseEntity.ok(Map.of("message", CART_CLEARED));
    }
}
