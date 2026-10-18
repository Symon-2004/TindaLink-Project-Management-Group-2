package com.notification_service.notification.controller;

import com.notification_service.common.utils.LoggerUtils;
import com.notification_service.notification.dto.request.NotificationRequest;
import com.notification_service.notification.dto.response.NotificationResponse;
import com.notification_service.notification.service.NotificationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.logging.Logger;

import static com.notification_service.common.utils.LoggerUtils.PROCESSING;
import static com.notification_service.notification.constant.NotificationMessages.*;

@Slf4j
@RequestMapping("/api/notification")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @PostMapping
    public ResponseEntity<NotificationResponse> create (@Valid @RequestBody NotificationRequest request){

        log.info(LoggerUtils.formatProcess(PROCESSING, CREATING_NOTIFICATION));

        NotificationResponse response = notificationService.createNotification(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);

    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<NotificationResponse>> getByUser(
            @PathVariable String userId,
            @RequestParam(defaultValue = "false") boolean unreadOnly,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size){

        log.info(LoggerUtils.formatProcess(PROCESSING,RETRIEVING_USER_NOTIFICATIONS));

        return ResponseEntity.ok(
                notificationService.getByUser(userId, unreadOnly, PageRequest.of(page, size))
        );
    }

    @GetMapping("/user/{userId/unread-count")
    public ResponseEntity<Map<String,Long>> getUnreadCount(@PathVariable String userId){

        return ResponseEntity.ok(Map.of("unread", notificationService.getUnreadCount(userId)));


    }

    @PatchMapping("/{id}/read")
    public ResponseEntity<NotificationResponse> markAsRead(@PathVariable String Id){

        log.info(LoggerUtils.formatProcess(PROCESSING,MARKING_NOTIFICATION_AS_READ));

        return ResponseEntity.ok(notificationService.markAsRead(Id));
    }

    @PatchMapping("user/{userId}/read-all")
    public ResponseEntity<Map<String, String>> markAllAsRead(@PathVariable String userId){

        log.info(LoggerUtils.formatProcess(PROCESSING, MARKING_ALL_NOTIFICATIONS_AS_READ));

        return ResponseEntity.ok(Map.of("message",ALL_NOTIFICATIONS_MARKED_AS_READ));


    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable String id){

        log.info(LoggerUtils.formatProcess(PROCESSING, DELETING_NOTIFICATION));

        notificationService.delete(id);

        return ResponseEntity.ok(Map.of("message", NOTIFICATION_DELETED));
    }
}

