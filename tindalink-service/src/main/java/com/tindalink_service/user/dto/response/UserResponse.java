package com.tindalink_service.user.dto.response;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.tindalink_service.common.enums.Role;
import com.tindalink_service.user.User;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Builder
@Data
public class UserResponse {

    private String id;

    private String firstname;

    private String lastname;

    private String email;



    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;


    public static UserResponse toResponse(User user){

        if(Objects.isNull(user)) return null;

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())

                .build();

    }

    public static UserResponse toBasicResponse(User user){
        if(Objects.isNull(user)) return null;

        return UserResponse.builder()
                .id(user.getId())
                .email(user.getEmail())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())

                .build();
    }

}
