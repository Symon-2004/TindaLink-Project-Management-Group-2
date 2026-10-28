package com.tindalink_service.category.constant;

public class CategoryMessages {
    // Process
    public static final String CREATING_CATEGORY = "Creating category";
    public static final String RETRIEVING_CATEGORIES = "Retrieving categories";
    public static final String RETRIEVING_CATEGORY_BY_ID = "Retrieving category by id";
    public static final String UPDATING_CATEGORY = "Updating category";
    public static final String DELETING_CATEGORY = "Deleting category";

    // Success
    public static final String CATEGORY_DELETED = "Category deleted successfully";

    // Errors
    public static final String CATEGORY_NOT_FOUND = "Category not found: ";
    public static final String CATEGORY_ALREADY_EXIST = "Category already exists in this store: ";
    public static final String CATEGORY_HAS_PRODUCTS = "Cannot delete a category that still has products";

    // Validation
    public static final String STORE_ID_REQUIRED = "Store id is required";
    public static final String CATEGORY_NAME_REQUIRED = "Category name is required";
    public static final String CATEGORY_NAME_TOO_LONG = "Category name must not exceed 100 characters";
}
