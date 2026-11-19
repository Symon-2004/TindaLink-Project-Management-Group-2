package com.tindalink_service.user.controller;

import static com.tindalink_service.common.constant.CommonMessages.PROCESSING;
import static com.tindalink_service.user.constant.UserMessages.*;

import java.util.List;
import java.util.Map;

import com.tindalink_service.user.dto.request.UserRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.tindalink_service.user.dto.response.UserResponse;
import com.tindalink_service.common.utils.ResponseUtils;
import com.tindalink_service.common.utils.LoggerUtils;
import com.tindalink_service.user.service.UserService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_ALL_USER));
        List<UserResponse> response = userService.getAllUsers();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable String id) {
        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_USER_BY_ID));
        UserResponse response = userService.getUserById(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<UserResponse> createUser(@Valid @RequestBody UserRequest request) {
        log.info(LoggerUtils.formatProcess(PROCESSING, CREATING_USER));
        UserResponse response = userService.createUser(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<UserResponse> login(@RequestBody Map<String, String> credentials) {
        log.info("Processing user login for email: {}", credentials.get("email"));
        UserResponse response = userService.login(credentials.get("email"), credentials.get("password"));
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<UserResponse> toggleStatus(@PathVariable String id) {
        log.info("Toggling user status for id: {}", id);
        return ResponseEntity.ok(userService.toggleStatus(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable String id, @Valid @RequestBody UserRequest request) {
        log.info(LoggerUtils.formatProcess(PROCESSING, UPDATING_USER));
        UserResponse response = userService.updateUser(id, request);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        log.info(LoggerUtils.formatProcess(PROCESSING, DELETING_USER));
        userService.deleteUser(id);
        return ResponseEntity.ok(
                ResponseUtils.buildSuccessResponse(HttpStatus.OK, DELETING_USER));
    }
}
