package com.tindalink_service.store.dto.request;

import com.tindalink_service.store.Store;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data

public class StoreRequest {

    @NotBlank(message = "Store name is required")
    @Size(max = 150, message = "Store name cannot exceed 150 characters")
    private String storeName;

    @NotBlank(message = "Store slug is required")
    @Size(max = 150, message = "Store slug cannot exceed 150 characters")
    private String storeSlug;

    private String storeDescription;

    @Size(max = 500, message = "Store logo URL cannot exceed 500 characters")
    private String storeLogoUrl;

    @Size(max = 500, message = "Header banner URL cannot exceed 500 characters")
    private String headerBannerUrl;

    @Size(max = 20, message = "Contact number cannot exceed 20 characters")
    private String contactNumber;


    public Store toEntity(Store existingStore) {
        Store store = (existingStore != null) ? existingStore : new Store();

        store.setStoreName(this.storeName);
        store.setStoreSlug(this.storeSlug);
        store.setStoreDescription(this.storeDescription);
        store.setStoreLogoUrl(this.storeLogoUrl);
        store.setHeaderBannerUrl(this.headerBannerUrl);
        store.setContactNumber(this.contactNumber);

        return store;
    }


}
