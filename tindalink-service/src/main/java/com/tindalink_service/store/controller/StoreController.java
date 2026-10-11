package com.tindalink_service.store.controller;

import static com.tindalink_service.common.constant.CommonMessages.PROCESSING;
import static com.tindalink_service.store.constant.StoreMessages.*;

import java.util.List;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tindalink_service.store.dto.request.StoreRequest;
import com.tindalink_service.store.dto.response.StoreResponse;
import com.tindalink_service.common.utils.ResponseUtils;
import com.tindalink_service.common.utils.LoggerUtils;
import com.tindalink_service.store.service.StoreService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/stores")
@RequiredArgsConstructor
public class StoreController {

    private final StoreService storeService;

    @GetMapping
    public ResponseEntity<?> getAllStores(){
        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_ALL_STORES));

        List<StoreResponse> response = storeService.getAllStore();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoreResponse> getStoreById(@PathVariable String id){

        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_STORE_BY_ID));

        StoreResponse response = storeService.getByStoreId(id);

        return ResponseEntity.ok(response);

    }

    @PostMapping
    public ResponseEntity<StoreResponse> createStore(@Valid @RequestBody StoreRequest request){

        log.info(LoggerUtils.formatProcess(PROCESSING, CREATING_STORE));

        StoreResponse response = storeService.createStore(request);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StoreResponse> updateStore(@PathVariable String id, @Valid @RequestBody StoreRequest request){

        log.info(LoggerUtils.formatProcess(PROCESSING, UPDATING_STORE));

        StoreResponse response = storeService.updateStore(id, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStore(@PathVariable String id){

        log.info(LoggerUtils.formatProcess(PROCESSING, DELETING_STORE));

        storeService.deleteStore(id);

        return ResponseEntity.ok(
                ResponseUtils.buildSuccessResponse(HttpStatus.OK, DELETING_STORE)
        );
    }

}
