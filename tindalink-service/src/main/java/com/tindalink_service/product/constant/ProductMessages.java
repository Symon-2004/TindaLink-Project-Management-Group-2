package com.tindalink_service.product.constant;

public class ProductMessages {

    // Process
    public static final String CREATING_PRODUCT = "Creating product";
    public static final String RETRIEVING_ALL_PRODUCTS = "Retrieving all products";
    public static final String RETRIEVING_PRODUCT_BY_ID = "Retrieving product by id";
    public static final String UPDATING_PRODUCT = "Updating product";
    public static final String PUBLISHING_PRODUCT = "Publishing product";
    public static final String ARCHIVING_PRODUCT = "Archiving product";
    public static final String DELETING_PRODUCT = "Deleting product";

    // Success
    public static final String PRODUCT_DELETED = "Product deleted successfully";

    // Errors
    public static final String PRODUCT_NOT_FOUND = "Product not found: ";
    public static final String PRODUCT_ALREADY_EXIST = "Product already exists in this store: ";
    public static final String PRODUCT_ALREADY_PUBLISHED = "Product is already published";
    public static final String PRODUCT_NEEDS_IMAGE = "A product needs at least one image to be published";
    public static final String CATEGORY_STORE_MISMATCH = "Category does not belong to this store";

    // Validation
    public static final String PRODUCT_STORE_ID_REQUIRED = "Store id is required";
    public static final String PRODUCT_INVENTORY_ID_REQUIRED = "Inventory id is required";
    public static final String PRODUCT_NAME_REQUIRED = "Product name is required";
    public static final String PRODUCT_NAME_TOO_LONG = "Product name must not exceed 100 characters";
    public static final String PRICE_REQUIRED = "Price is required";
    public static final String PRICE_INVALID = "Price must be greater than 0";
    public static final String IMAGES_TOO_MANY = "A product can have at most 10 images";
}
