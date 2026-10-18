package com.tindalink_service.inventory.constant;

public class InventoryMessages {

    // Process
    public static final String CREATING_INVENTORY = "Creating inventory item";
    public static final String RETRIEVING_ALL_INVENTORY = "Retrieving all inventory items";
    public static final String RETRIEVING_INVENTORY_BY_ID = "Retrieving inventory item by id";
    public static final String UPDATING_INVENTORY = "Updating inventory item";
    public static final String ADJUSTING_STOCK = "Adjusting stock quantity";
    public static final String DELETING_INVENTORY = "Deleting inventory item";

    // Success
    public static final String INVENTORY_DELETED = "Inventory item deleted successfully";

    // Errors
    public static final String INVENTORY_NOT_FOUND = "Inventory item not found: ";
    public static final String INVENTORY_ALREADY_EXIST = "Product already exists in inventory: ";
    public static final String INSUFFICIENT_STOCK = "Insufficient stock. Available: ";

    // Validation
    public static final String PRODUCT_NAME_REQUIRED = "Product name is required";
    public static final String PRODUCT_NAME_TOO_LONG = "Product name must not exceed 50 characters";
    public static final String STOCK_QUANTITY_REQUIRED = "Stock quantity is required";
    public static final String STOCK_QUANTITY_NEGATIVE = "Stock quantity must not be negative";
    public static final String ADJUSTMENT_REQUIRED = "Adjustment is required";
}

