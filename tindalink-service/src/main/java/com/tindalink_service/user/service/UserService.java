package com.tindalink_service.user.service;

import com.tindalink_service.common.exception.BadRequestException;
import com.tindalink_service.common.exception.NotFoundException;
import com.tindalink_service.user.User;
import com.tindalink_service.user.dto.request.UserRequest;
import com.tindalink_service.user.dto.response.UserResponse;
import com.tindalink_service.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    private static final String USER_NOT_FOUND = "User not found with id: ";
    private static final String EMAIL_NOT_UNIQUE = "Email is already in use: ";

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<UserResponse> getAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(UserResponse::toResponse)
                .toList();
    }

    public UserResponse getUserById(String id) {
        return userRepository.findById(id)
                .map(UserResponse::toResponse)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND + id));
    }

    public UserResponse createUser(UserRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException(EMAIL_NOT_UNIQUE + request.getEmail());
        }
        User user = request.toEntity(null);
        User savedUser = userRepository.save(user);

        return UserResponse.toResponse(savedUser);
    }

    public UserResponse updateUser(String id, UserRequest request) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND + id));

        if (!existingUser.getEmail().equals(request.getEmail()) && userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException(EMAIL_NOT_UNIQUE + request.getEmail());
        }

        User updateUser = request.toEntity(existingUser);
        User savedUser = userRepository.save(updateUser);

        return UserResponse.toResponse(savedUser);
    }

    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new NotFoundException(USER_NOT_FOUND + id);
        }
        userRepository.deleteById(id);
    }

    public UserResponse login(String email, String password) {
        if (email == null || email.isBlank() || password == null || password.isBlank()) {
            throw new BadRequestException("Email and password are required");
        }

        User user = userRepository.findByEmail(email.trim())
                .orElseThrow(() -> new NotFoundException("We couldn't find an account with that email."));

        if (!password.equals(user.getPasswordHash())) {
            throw new BadRequestException("Invalid credentials. Please check your password.");
        }

        return UserResponse.toResponse(user);
    }

    public UserResponse toggleStatus(String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(USER_NOT_FOUND + id));

        String newStatus = "Active".equalsIgnoreCase(user.getStatus()) ? "Suspended" : "Active";
        user.setStatus(newStatus);
        return UserResponse.toResponse(userRepository.save(user));
    }
}
