package com.transaction_service.Order.controller;

import static com.transaction_service.Order.Constant.OrderMessages.*;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.transaction_service.Order.dto.request.OrderRequest;
import com.transaction_service.Order.dto.request.OrderStatusRequest;
import com.transaction_service.Order.dto.response.OrderResponse;
import com.transaction_service.Order.service.OrderService;
import com.transaction_service.common.enums.OrderStatus;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<OrderResponse> checkout(@Valid @RequestBody OrderRequest request) {
        log.info(ORDER_CHECKOUT);
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.checkout(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponse> getById(@PathVariable("id") String id) {
        log.info(RETRIEVING_ORDER_BY_ID);
        return ResponseEntity.ok(orderService.getById(id));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<OrderResponse>> getByUser(@PathVariable("userId") String userId) {
        log.info(RETRIEVING_USER_ORDERS);
        return ResponseEntity.ok(orderService.getByUser(userId));
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<OrderResponse>> getByStore(
            @PathVariable("storeId") String storeId,
            @RequestParam(name = "status", required = false) OrderStatus status) {
        log.info(RETRIEVING_STORE_ORDERS);
        return ResponseEntity.ok(orderService.getByStore(storeId, status));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<OrderResponse> updateStatus(
            @PathVariable("id") String id,
            @Valid @RequestBody OrderStatusRequest request) {
        log.info(UPDATING_ORDER_STATUS);
        return ResponseEntity.ok(orderService.updateStatus(id, request));
    }
}