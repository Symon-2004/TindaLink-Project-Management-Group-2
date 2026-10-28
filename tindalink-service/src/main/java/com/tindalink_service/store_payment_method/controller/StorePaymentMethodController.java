package com.tindalink_service.store_payment_method.controller;

import com.tindalink_service.common.utils.LoggerUtils;
import com.tindalink_service.store_payment_method.dto.request.StorePaymentMethodRequest;
import com.tindalink_service.store_payment_method.dto.response.StorePaymentMethodResponse;
import com.tindalink_service.store_payment_method.service.StorePaymentMethodService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

import static com.tindalink_service.common.utils.LoggerUtils.*;
import static com.tindalink_service.store_payment_method.constant.StorePaymentMethodMessages.*;

@Slf4j
@RestController
@RequestMapping("/api/store-payment-method")
@RequiredArgsConstructor
public class StorePaymentMethodController {

    private final StorePaymentMethodService paymentMethodService;

    @PostMapping
    public ResponseEntity<StorePaymentMethodResponse> create(@Valid @RequestBody StorePaymentMethodRequest request){

        log.info(LoggerUtils.formatProcess(PROCESSING, CREATING_PAYMENT_METHOD));

        return ResponseEntity.status(HttpStatus.CREATED).body(paymentMethodService.create(request));

    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<StorePaymentMethodResponse>> getByStore(@PathVariable String storeId){

        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_PAYMENT_METHODS));

        return ResponseEntity.ok(paymentMethodService.getByStore(storeId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<StorePaymentMethodResponse> getById(@PathVariable String id){

        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_PAYMENT_METHOD_BY_ID));

        return ResponseEntity.ok(paymentMethodService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<StorePaymentMethodResponse> update(@PathVariable String id, @Valid @RequestBody StorePaymentMethodRequest request){

        log.info(LoggerUtils.formatProcess(PROCESSING, UPDATING_PAYMENT_METHOD));

        return ResponseEntity.ok(paymentMethodService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable String id){

        log.info(LoggerUtils.formatProcess(PROCESSING, DELETING_PAYMENT_METHOD));

        paymentMethodService.delete(id);

        return ResponseEntity.ok(Map.of("message", PAYMENT_METHOD_DELETED));
    }
}
