package com.instagram_service.service;


import com.instagram_service.dto.request.CrossPostRequest;
import com.instagram_service.model.InstagramAccount;
import com.instagram_service.model.InstagramPost;
import com.instagram_service.repository.InstagramAccountRepository;
import com.instagram_service.repository.InstagramPostRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class InstagramPublishingService {

}