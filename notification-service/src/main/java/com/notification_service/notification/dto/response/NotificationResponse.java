package com.notification_service.notification.dto.response;

import com.notification_service.common.enums.NotificationType;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Builder
@Data
public class NotificationResponse {

    private String id;

    private String userId;

    private String storeId;

    private NotificationType notificationType;

    private String title;

    private String message;

    private Boolean read;

    private Instant createdAt;

    private Instant updatedAt;
}
