package com.notification_service.notification.dto.request;


import com.notification_service.common.enums.NotificationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class NotificationRequest {

    @NotBlank(message = "User id is required")
    private String userId;

    private String storeId;

    @NotNull(message = "Notification type is required")
    private NotificationType notificationType;

    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @NotBlank(message = "Message is required")
    private String message;
}
