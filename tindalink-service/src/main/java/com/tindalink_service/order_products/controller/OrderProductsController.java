package com.tindalink_service.order_products.controller;

import com.tindalink_service.common.utils.LoggerUtils;
import com.tindalink_service.order_products.dto.response.OrderProductsResponse;
import com.tindalink_service.order_products.service.OrderProductsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static com.tindalink_service.common.utils.LoggerUtils.*;
import static com.tindalink_service.order_products.constant.OrderProductsMessages.RETRIEVING_ORDER_PRODUCTS;
import static com.tindalink_service.order_products.constant.OrderProductsMessages.RETRIEVING_ORDER_PRODUCT_BY_ID;

@Slf4j
@RestController
@RequestMapping("/api/order-products")
@RequiredArgsConstructor
public class OrderProductsController {

    private final OrderProductsService orderProductsService;

    @GetMapping("/order/{orderId")
    public ResponseEntity<List<OrderProductsResponse>> getByOrder(@PathVariable String orderId){

        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_ORDER_PRODUCTS));

        return ResponseEntity.ok((orderProductsService.getByOrder(orderId)));
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderProductsResponse> getById(@PathVariable String id){

        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_ORDER_PRODUCT_BY_ID));

        return ResponseEntity.ok(orderProductsService.getById(id));
    }
}
