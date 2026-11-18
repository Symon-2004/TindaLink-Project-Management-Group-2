package com.instagram_service.repository;


import com.instagram_service.model.InstagramAccount;
import com.instagram_service.model.InstagramPost;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface InstagramPostRepository extends MongoRepository<InstagramPost,String> {



}
