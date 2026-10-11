package com.tindalink_service.user;


import com.tindalink_service.common.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@RequiredArgsConstructor
@AllArgsConstructor

@Document(collection = "users")
public class User implements Serializable {

    @Id
    private String id;

    private String firstname;

    private String lastname;

    private String email;

    private String  passwordHash;

    private String phone;


    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

}
