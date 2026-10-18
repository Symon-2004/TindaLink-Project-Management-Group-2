package com.notification_service.notification.service;

import com.notification_service.common.exception.NotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageRequest;


import com.notification_service.notification.Notification;
import com.notification_service.notification.dto.request.NotificationRequest;
import com.notification_service.notification.dto.response.NotificationResponse;
import com.notification_service.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.notification_service.notification.constant.NotificationMessages.NOTIFICATION_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public NotificationResponse createNotification(NotificationRequest request){

        Notification saved = notificationRepository.save(
                Notification.builder()
                        .userId(request.getUserId())
                        .storeId(request.getStoreId())
                        .notificationType(request.getNotificationType())
                        .title(request.getTitle())
                        .message(request.getMessage())
                        .read(false)
                        .build()
        );
        return toResponse(saved);
    }

    private NotificationResponse toResponse(Notification notification){

        return NotificationResponse.builder()
                .id(notification.getId())
                .userId(notification.getUserId())
                .storeId(notification.getStoreId())
                .notificationType(notification.getNotificationType())
                .title(notification.getTitle())
                .message(notification.getMessage())
                .read(notification.getRead())
                .createdAt(notification.getCreatedAt())
                .updatedAt(notification.getUpdatedAt())
                .build();
    }

    public Page<NotificationResponse> getByUser(String userId, boolean unreadOnly, Pageable pageable){

        Page<Notification> page = unreadOnly
                ? notificationRepository.findByUserIdAndReadFalseOrderByCreatedAtDesc(userId, pageable)
                : notificationRepository.findByUserIdOrderByCreatedAtDesc(userId, pageable);

        return page.map(this::toResponse);
    }

    public long getUnreadCount(String userId){

        return notificationRepository.countByUserIdAndReadFalse(userId);
    }

    public NotificationResponse markAsRead(String id){

        Notification notification = notificationRepository.findById(id)
                .orElseThrow(()-> new NotFoundException(NOTIFICATION_NOT_FOUND + id));

        notification.setRead(true);
        return toResponse(notificationRepository.save(notification));
    }

    public void delete(String id){

        if(!notificationRepository.existsById(id)){

            throw new NotFoundException(NOTIFICATION_NOT_FOUND + id);
        }
        notificationRepository.deleteById(id);
    }

}



