package com.tindalink_service.user_stores.service;


import com.tindalink_service.common.exception.BadRequestException;
import com.tindalink_service.common.exception.NotFoundException;
import com.tindalink_service.store.repository.StoreRepository;
import com.tindalink_service.user.repository.UserRepository;
import com.tindalink_service.user_stores.User_Stores;
import com.tindalink_service.user_stores.dto.request.User_StoreRequest;
import com.tindalink_service.user_stores.dto.response.User_StoreResponse;
import com.tindalink_service.user_stores.repository.User_StoreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.tindalink_service.user_stores.constant.User_StoreMessages.UserStoreMessages.USER_STORE_ALREADY_EXIST;
import static com.tindalink_service.user_stores.constant.User_StoreMessages.UserStoreMessages.USER_STORE_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class User_StoresService {

    private final User_StoreRepository userStoreRepository;
    private final UserRepository userRepository;
    private final StoreRepository storeRepository;

   ;


    public User_StoreResponse assign(User_StoreRequest request){

        if(!userRepository.existsById(request.getUserId())) {
            throw new NotFoundException("User not found" + request.getUserId());
        }

        if(!storeRepository.existsById(request.getStoreId())){
            throw new NotFoundException("Store not found: " + request.getStoreId());
        }

        if(userStoreRepository.existsByUserIdAndStoreId(request.getUserId(), request.getStoreId())){
            throw new BadRequestException(USER_STORE_ALREADY_EXIST);
        }

        User_Stores saved = userStoreRepository.save(
                User_Stores.builder()
                        .userId(request.getUserId())
                        .storeId(request.getStoreId())
                        .role(request.getRole())
                        .build()
        );
        return toResponse(saved);
    }

    public List<User_StoreResponse> getByStore(String storeId){
        return userStoreRepository.findByStoreId(storeId).stream().map(this::toResponse).toList();

    }

    public List<User_StoreResponse> getByUser(String userId) {
        return userStoreRepository.findByUserId(userId).stream().map(this::toResponse).toList();

    }

    public void delete (String id){
        if(!userStoreRepository.existsById(id)){
            throw new NotFoundException(USER_STORE_NOT_FOUND + id);

        }
        userStoreRepository.deleteById(id);
    }

    private User_StoreResponse toResponse(User_Stores us){
        return User_StoreResponse.builder()
                .id(us.getId())
                .userId(us.getUserId())
                .storeId(us.getStoreId())
                .role(us.getRole())
                .build();

    }


}


