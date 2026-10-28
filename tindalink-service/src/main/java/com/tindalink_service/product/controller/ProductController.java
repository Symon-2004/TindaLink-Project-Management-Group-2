package com.tindalink_service.product.controller;

import com.tindalink_service.common.enums.ProductStatus;
import com.tindalink_service.common.utils.LoggerUtils;
import com.tindalink_service.product.dto.request.ProductRequest;
import com.tindalink_service.product.dto.response.ProductResponse;
import com.tindalink_service.product.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.Map;

import static com.tindalink_service.common.constant.CommonMessages.*;
import static com.tindalink_service.product.constant.ProductMessages.*;

@Slf4j
@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<ProductResponse> create(@Valid @RequestBody ProductRequest request){

        log.info(LoggerUtils.formatProcess(PROCESSING, CREATING_PRODUCT));

        return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(request));
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<ProductResponse>> getByStore(@PathVariable String storeId, @RequestParam(required = false)ProductStatus status){

        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_ALL_PRODUCTS));

        return ResponseEntity.ok(productService.getByStore(storeId, status));

    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getById(@PathVariable String id){

        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_PRODUCT_BY_ID));

        return ResponseEntity.ok(productService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(@PathVariable String id, @Valid @RequestBody ProductRequest request){

        log.info(LoggerUtils.formatProcess(PROCESSING, UPDATING_PRODUCT));

        return ResponseEntity.ok(productService.update(id,request));
    }

    @PatchMapping("/{id}/publish")
    public ResponseEntity<ProductResponse> publish(@PathVariable String id){

        log.info(LoggerUtils.formatProcess(PROCESSING, PUBLISHING_PRODUCT));

        return ResponseEntity.ok(productService.publish(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable String Id){

        log.info(LoggerUtils.formatProcess(PROCESSING, DELETING_PRODUCT));

        productService.delete(Id);

        return ResponseEntity.ok(Map.of("message", PRODUCT_DELETED));
    }
}
