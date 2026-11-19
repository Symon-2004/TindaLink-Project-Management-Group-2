package com.tindalink_service.user.dto.request;

import java.util.Objects;
import com.tindalink_service.user.User;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {

    private String id;
    private String firstname;
    private String lastname;
    private String phone;
    private String role;
    private String status;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 64, message = "Password must be between 8 and 64 characters long")
    @Pattern(
            regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$",
            message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
    )
    private String password;

    public User toEntity(User user){
        if (Objects.isNull(user)){
            user = new User();
            user.setPasswordHash(password);
            user.setStatus(status != null ? status : "Active");
            user.setRole(role != null ? role : "Customer");
        }
        user.setEmail(email);
        if (firstname != null) user.setFirstname(firstname);
        if (lastname != null) user.setLastname(lastname);
        if (phone != null) user.setPhone(phone);
        if (role != null) user.setRole(role);
        if (status != null) user.setStatus(status);

        return user;
    }
}
