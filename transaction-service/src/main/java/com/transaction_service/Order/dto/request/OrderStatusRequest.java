package com.transaction_service.Order.dto.request;

import com.transaction_service.common.enums.OrderStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import static com.transaction_service.Order.Constant.OrderMessages.ORDER_STATUS_REQUIRED;

@Data
public class OrderStatusRequest {

    @NotNull(message = ORDER_STATUS_REQUIRED)
    private OrderStatus orderStatus;
}
