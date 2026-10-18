package com.notification_service.notification;

import com.notification_service.common.enums.NotificationType;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.Instant;

@Document(collection = "notification")
@CompoundIndex(name = "user_read_idx", def = "{'userId': 1, 'read': 1, 'createdAt': -1}")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification implements Serializable {

    @Id
    private String id;

    @Indexed
    private String userId;

    @Indexed
    private String storeId;

    private NotificationType notificationType;

    private String title;

    private String message;

    @Builder.Default
    private Boolean read = false;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

}
