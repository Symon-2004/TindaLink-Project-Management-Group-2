package com.tindalink_service.store_payment_method.service;

import com.tindalink_service.common.exception.BadRequestException;
import com.tindalink_service.common.exception.NotFoundException;
import com.tindalink_service.store.repository.StoreRepository;
import com.tindalink_service.store_payment_method.StorePaymentMethod;
import com.tindalink_service.store_payment_method.dto.request.StorePaymentMethodRequest;
import com.tindalink_service.store_payment_method.dto.response.StorePaymentMethodResponse;
import com.tindalink_service.store_payment_method.repository.StorePaymentMethodRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.tindalink_service.store.constant.StoreMessages.*;
import static com.tindalink_service.store_payment_method.constant.StorePaymentMethodMessages.*;

@Service
@RequiredArgsConstructor
public class StorePaymentMethodService {

    private final StorePaymentMethodRepository storePaymentMethodRepository;
    private final StoreRepository storeRepository;

    public StorePaymentMethodResponse create (StorePaymentMethodRequest request){

        if(!storeRepository.existsById(request.getStoreId())){
            throw new NotFoundException(STORE_NOT_FOUND + request.getStoreId());
        }

        if(storePaymentMethodRepository.existsByStoreIdAndProvider(request.getStoreId(), request.getProvider())){
            throw new BadRequestException(PAYMENT_METHOD_ALREADY_EXIST + request.getProvider());
        }

        StorePaymentMethod saved = storePaymentMethodRepository.save(
                StorePaymentMethod.builder()
                        .storeId(request.getStoreId())
                        .provider(request.getProvider())
                        .accountName(request.getAccountName())
                        .accountNumber(request.getAccountNumber())
                        .qrUrl(blankToNull(request.getQrUrl()))
                        .build()
        );
        return toResponse(saved);
    }

    private StorePaymentMethodResponse toResponse(StorePaymentMethod storePaymentMethod){

        return StorePaymentMethodResponse.builder()
                .id(storePaymentMethod.getId())
                .storeId(storePaymentMethod.getStoreId())
                .provider(storePaymentMethod.getProvider())
                .accountName(storePaymentMethod.getAccountName())
                .accountNumber(storePaymentMethod.getAccountNumber())
                .qrUrl(storePaymentMethod.getQrUrl())
                .createdAt(storePaymentMethod.getCreatedAt())
                .updatedAt(storePaymentMethod.getUpdatedAt())
                .build();
    }

    private String blankToNull(String value){
        return (value == null || value.isBlank()) ? null : value.trim();
    }

    private StorePaymentMethod findOrThrow(String id){
        return storePaymentMethodRepository.findById(id).orElseThrow(()-> new NotFoundException(PAYMENT_METHOD_NOT_FOUND + id));

    }

    public List<StorePaymentMethodResponse> getByStore(String storeId){
        return storePaymentMethodRepository.findByStoreId(storeId).stream().map(this::toResponse).toList();

    }

    public StorePaymentMethodResponse getById(String id){
        return toResponse(findOrThrow(id));

    }

    public StorePaymentMethodResponse update(String id, StorePaymentMethodRequest request){
        StorePaymentMethod method = findOrThrow(id);

        if(!method.getStoreId().equals(request.getStoreId())){
            throw new BadRequestException(PAYMENT_METHOD_STORE_CHANGE);
        }

        if(method.getProvider() !=request.getProvider() && storePaymentMethodRepository.existsByStoreIdAndProvider(method.getStoreId(), request.getProvider())){
            throw new BadRequestException(PAYMENT_METHOD_ALREADY_EXIST + request.getProvider());

        }
        method.setProvider(request.getProvider());
        method.setAccountName(request.getAccountName().trim());
        method.setAccountNumber(request.getAccountNumber());
        method.setQrUrl(request.getQrUrl());
        return toResponse(storePaymentMethodRepository.save(method));
    }

    public void delete (String id){
        if(!storePaymentMethodRepository.existsById(id)){
            throw new NotFoundException(PAYMENT_METHOD_NOT_FOUND + id);
        }
        storePaymentMethodRepository.deleteById(id);
    }

}
