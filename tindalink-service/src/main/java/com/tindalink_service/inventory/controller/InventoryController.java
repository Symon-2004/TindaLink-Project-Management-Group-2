package com.tindalink_service.inventory.controller;


import com.tindalink_service.common.enums.InventoryStatus;
import com.tindalink_service.common.utils.LoggerUtils;
import com.tindalink_service.inventory.dto.request.InventoryRequest;
import com.tindalink_service.inventory.dto.response.InventoryResponse;
import com.tindalink_service.inventory.service.InventoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.tindalink_service.common.constant.CommonMessages.PROCESSING;
import static com.tindalink_service.inventory.constant.InventoryMessages.*;

@Slf4j
@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {

    private final InventoryService inventoryService;

    @PostMapping
    public ResponseEntity<InventoryResponse> create(@Valid @RequestBody InventoryRequest request){

        log.info(LoggerUtils.formatProcess(PROCESSING, CREATING_INVENTORY));

        return ResponseEntity.status(HttpStatus.CREATED).body(inventoryService.create(request));
    }

    @GetMapping
    public ResponseEntity<List<InventoryResponse>> getAllInventory(@RequestParam(required = false)InventoryStatus status){

        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_ALL_INVENTORY));

        return ResponseEntity.ok(inventoryService.getAll(status));
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryResponse> getById(@PathVariable String id){

        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_INVENTORY_BY_ID));

        return ResponseEntity.ok(inventoryService.getById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryResponse> update(@PathVariable String id, @Valid @RequestBody InventoryRequest request){

        log.info(LoggerUtils.formatProcess(PROCESSING, UPDATING_INVENTORY));

        return ResponseEntity.ok(inventoryService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete (@PathVariable String id){

        log.info(LoggerUtils.formatProcess(PROCESSING, DELETING_INVENTORY));
        inventoryService.delete(id);

        return ResponseEntity.ok(Map.of("message", INVENTORY_DELETED));
    }
}
