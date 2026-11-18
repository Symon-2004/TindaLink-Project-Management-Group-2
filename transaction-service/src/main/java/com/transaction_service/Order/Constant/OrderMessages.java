package com.transaction_service.Order.Constant;

public class OrderMessages {

    // Process
    public static final String ORDER_CHECKOUT = "Processing checkout";
    public static final String RETRIEVING_ORDER_BY_ID = "Retrieving order by id";
    public static final String RETRIEVING_USER_ORDERS = "Retrieving user orders";
    public static final String RETRIEVING_STORE_ORDERS = "Retrieving store orders";
    public static final String UPDATING_ORDER_STATUS = "Updating order status";

    // Errors
    public static final String ORDER_NOT_FOUND = "Order not found: ";
    public static final String ORDER_STATUS_INVALID_CHANGE = "Cannot change order status from %s to %s";
    public static final String ORDER_STATUS_NOT_ALLOWED = "Order status cannot be set to ";

    // Validation
    public static final String ORDER_USER_ID_REQUIRED = "User id is required";
    public static final String ORDER_STORE_ID_REQUIRED = "Store id is required";
    public static final String ORDER_ADDRESS_REQUIRED = "Shipping address is required";
    public static final String ORDER_ADDRESS_TOO_LONG = "Shipping address must not exceed 500 characters";
    public static final String ORDER_PAYMENT_METHOD_REQUIRED = "Payment method is required";
    public static final String ORDER_STATUS_REQUIRED = "Order status is required";
}

