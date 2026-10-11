package com.tindalink_service.store.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tindalink_service.store.Store;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Objects;

@Builder
@Data
public class StoreResponse {

    private String id;

    private String storeName;

    private String storeSlug;

    private String storeDescription;

    private String storeLogoUrl;

    private String headerBannerUrl;

    private String contactNumber;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss" )
    private LocalDateTime updatedAt;

    public static StoreResponse toResponse(Store store) {
        if (Objects.isNull(store)) return null;

        return StoreResponse.builder()
                .id(store.getId())
                .storeName(store.getStoreName())
                .storeSlug(store.getStoreSlug())
                .build();
    }

    public static StoreResponse toBasicResponse(Store store) {
        if (Objects.isNull(store)) return null;

        return StoreResponse.builder()
                .id(store.getId())
                .storeName(store.getStoreName())
                .storeSlug(store.getStoreSlug())
                .storeDescription(store.getStoreDescription())
                .storeLogoUrl(store.getStoreLogoUrl())
                .headerBannerUrl(store.getHeaderBannerUrl())
                .contactNumber(store.getContactNumber())
                .createdAt(store.getCreatedAt())
                .updatedAt(store.getUpdatedAt())
                .build();
    }




}
