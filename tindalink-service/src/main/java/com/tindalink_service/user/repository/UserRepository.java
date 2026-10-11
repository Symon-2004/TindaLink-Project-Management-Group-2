package com.tindalink_service.user.repository;

import com.tindalink_service.user.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;


public interface UserRepository extends MongoRepository<User,String> {

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);
}
