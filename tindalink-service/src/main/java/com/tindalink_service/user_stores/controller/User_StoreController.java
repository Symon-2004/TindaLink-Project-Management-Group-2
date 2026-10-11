package com.tindalink_service.user_stores.controller;


import com.tindalink_service.common.utils.LoggerUtils;
import com.tindalink_service.common.utils.ResponseUtils;
import com.tindalink_service.user_stores.dto.request.User_StoreRequest;
import com.tindalink_service.user_stores.dto.response.User_StoreResponse;
import com.tindalink_service.user_stores.service.User_StoresService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.tindalink_service.common.constant.CommonMessages.PROCESSING;
import static com.tindalink_service.user_stores.constant.User_StoreMessages.UserStoreMessages.*;

@Slf4j
@RestController
@RequestMapping("/api/user-stores")
@RequiredArgsConstructor
public class User_StoreController {

    private final User_StoresService userStoresService;

    @PostMapping
    public ResponseEntity<User_StoreResponse> assign (@Valid @RequestBody User_StoreRequest request){

        log.info(LoggerUtils.formatProcess(PROCESSING, ASSIGNING_USER_TO_STORE));

        User_StoreResponse response = userStoresService.assign(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<User_StoreResponse>> getByStore(@PathVariable String storeId){

        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_USER_STORES));

        return ResponseEntity.ok(userStoresService.getByStore(storeId));
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<List<User_StoreResponse>> getByUser(@PathVariable String userId){

        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_USER_STORES));

        return ResponseEntity.ok(userStoresService.getByUser(userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id){

        log.info(LoggerUtils.formatProcess(PROCESSING, REMOVING_USER_FROM_STORE));

        userStoresService.delete(id);

        return ResponseEntity.ok(
                ResponseUtils.buildSuccessResponse(HttpStatus.OK, REMOVING_USER_FROM_STORE)
        );
    }
}
