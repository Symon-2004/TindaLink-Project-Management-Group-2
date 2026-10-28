package com.tindalink_service.store_payment_method.dto.request;

import com.tindalink_service.common.enums.PaymentProvider;
import com.tindalink_service.common.enums.ProductStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

import static com.tindalink_service.store_payment_method.constant.StorePaymentMethodMessages.*;

@Data
public class StorePaymentMethodRequest {

    @NotBlank(message = PAYMENT_STORE_ID_REQUIRED)
    private String storeId;

    @NotNull(message = PROVIDER_REQUIRED)
    private PaymentProvider provider;

    @NotBlank(message = ACCOUNT_NAME_REQUIRED)
    @Size(max = 150, message = ACCOUNT_NAME_TOO_LONG)
    private String accountName;

    @NotBlank(message = ACCOUNT_NUMBER_REQUIRED)
    @Pattern(regexp = "^[0-9]{10,15}$", message = ACCOUNT_NUMBER_INVALID)
    private String accountNumber;

    @Size(max = 500, message = QR_URL_TOO_LONG)
    @Pattern(regexp = "^$|^https?://.+", message = QR_URL_INVALID)
    private String qrUrl;




}
