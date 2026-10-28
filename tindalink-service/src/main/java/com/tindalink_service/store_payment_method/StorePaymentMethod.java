package com.tindalink_service.store_payment_method;

import com.tindalink_service.common.enums.PaymentProvider;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document(collection = "store_payment_method")
@CompoundIndex(name = "store_provider_unique", def = "{'storeId': 1, 'provider': 1}", unique = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StorePaymentMethod {

    @Id
    private String id;

    @Indexed
    private String storeId;

    private PaymentProvider provider;

    private String accountName;

    private String accountNumber;

    private String qrUrl;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}
