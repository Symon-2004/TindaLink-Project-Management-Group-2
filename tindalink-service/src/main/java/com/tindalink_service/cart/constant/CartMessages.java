package com.tindalink_service.cart.constant;

public class CartMessages {

    // Process
    public static final String ADDING_TO_CART = "Adding item to cart";
    public static final String RETRIEVING_CART = "Retrieving cart";
    public static final String UPDATING_CART_ITEM = "Updating cart item";
    public static final String REMOVING_CART_ITEM = "Removing cart item";
    public static final String CLEARING_CART = "Clearing cart";

    // Success
    public static final String CART_ITEM_REMOVED = "Item removed from cart";
    public static final String CART_CLEARED = "Cart cleared";

    // Errors
    public static final String CART_ITEM_NOT_FOUND = "Cart item not found: ";
    public static final String PRODUCT_NOT_AVAILABLE = "Product is not available for purchase";
    public static final String QUANTITY_EXCEEDS_STOCK = "Not enough stock. Available: ";

    // Validation
    public static final String USER_ID_REQUIRED = "User id is required";
    public static final String PRODUCT_ID_REQUIRED = "Product id is required";
    public static final String QUANTITY_REQUIRED = "Quantity is required";
    public static final String QUANTITY_INVALID = "Quantity must be at least 1";
    public static final String QUANTITY_TOO_HIGH = "Quantity must not exceed 99";
}
