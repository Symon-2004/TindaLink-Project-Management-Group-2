package com.tindalink_service.store_payment_method.constant;

public class StorePaymentMethodMessages {

    // Process
    public static final String CREATING_PAYMENT_METHOD = "Creating store payment method";
    public static final String RETRIEVING_PAYMENT_METHODS = "Retrieving store payment methods";
    public static final String RETRIEVING_PAYMENT_METHOD_BY_ID = "Retrieving store payment method by id";
    public static final String UPDATING_PAYMENT_METHOD = "Updating store payment method";
    public static final String DELETING_PAYMENT_METHOD = "Deleting store payment method";

    // Success
    public static final String PAYMENT_METHOD_DELETED = "Payment method deleted successfully";

    // Errors
    public static final String PAYMENT_METHOD_NOT_FOUND = "Payment method not found: ";
    public static final String PAYMENT_METHOD_ALREADY_EXIST = "This store already has a payment method for ";
    public static final String PAYMENT_METHOD_STORE_CHANGE = "A payment method cannot be moved to another store";

    // Validation
    public static final String PAYMENT_STORE_ID_REQUIRED = "Store id is required";
    public static final String PROVIDER_REQUIRED = "Payment provider is required";
    public static final String ACCOUNT_NAME_REQUIRED = "Account name is required";
    public static final String ACCOUNT_NAME_TOO_LONG = "Account name must not exceed 150 characters";
    public static final String ACCOUNT_NUMBER_REQUIRED = "Account number is required";
    public static final String ACCOUNT_NUMBER_INVALID = "Account number must contain 10 to 15 digits only";
    public static final String QR_URL_TOO_LONG = "QR URL must not exceed 500 characters";
    public static final String QR_URL_INVALID = "QR URL must start with http:// or https://";
}

