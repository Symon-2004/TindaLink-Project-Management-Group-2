package com.tindalink_service.store_payment_method.dto.response;

import com.tindalink_service.common.enums.PaymentProvider;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@Builder
public class StorePaymentMethodResponse {
    private String id;
    private String storeId;
    private PaymentProvider provider;
    private String accountName;
    private String accountNumber;
    private String qrUrl;
    private Instant createdAt;
    private Instant updatedAt;


}
