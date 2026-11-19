package com.tindalink_service.user.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tindalink_service.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Objects;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserResponse {

    private String id;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String role;
    private String status;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    public static UserResponse toResponse(User user) {
        if (Objects.isNull(user)) return null;

        return UserResponse.builder()
                .id(user.getId())
                .firstname(user.getFirstname())
                .lastname(user.getLastname())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole() != null ? user.getRole() : "Customer")
                .status(user.getStatus() != null ? user.getStatus() : "Active")
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

    public static UserResponse toBasicResponse(User user) {
        return toResponse(user);
    }
}
