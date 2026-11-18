package com.instagram_service.repository;

import com.instagram_service.model.InstagramAccount;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface InstagramAccountRepository extends MongoRepository<InstagramAccount, String> {


}
