package com.transaction_service.Order.dto.request;

import static com.transaction_service.Order.Constant.OrderMessages.ORDER_USER_ID_REQUIRED;
import static com.transaction_service.Order.Constant.OrderMessages.*;

import com.transaction_service.Order.Constant.OrderMessages;

import com.transaction_service.common.enums.OrderPaymentMethod;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class OrderRequest {

    @NotBlank(message = ORDER_USER_ID_REQUIRED)
    private String userId;

    @NotBlank(message = ORDER_STORE_ID_REQUIRED)
    private String storeId;

    @NotBlank(message = ORDER_ADDRESS_REQUIRED)
    @Size(max = 500, message = ORDER_ADDRESS_TOO_LONG)
    private String shippingAddress;

    @NotNull(message = ORDER_PAYMENT_METHOD_REQUIRED)
    private OrderPaymentMethod paymentMethod;
}