package com.notification_service.notification.constant;

public class NotificationMessages {

    public static final String CREATING_NOTIFICATION = "Creating notification";
    public static final String RETRIEVING_USER_NOTIFICATIONS = "Retrieving user notifications";
    public static final String RETRIEVING_UNREAD_COUNT = "Retrieving unread notification count";
    public static final String MARKING_NOTIFICATION_AS_READ = "Marking notification as read";
    public static final String MARKING_ALL_NOTIFICATIONS_AS_READ = "Marking all notifications as read";
    public static final String DELETING_NOTIFICATION = "Deleting notification";

    // ===== Success messages =====
    public static final String NOTIFICATION_CREATED = "Notification created successfully";
    public static final String NOTIFICATION_MARKED_AS_READ = "Notification marked as read";
    public static final String ALL_NOTIFICATIONS_MARKED_AS_READ = "All notifications marked as read";
    public static final String NOTIFICATION_DELETED = "Notification deleted successfully";

    // ===== Error messages =====
    public static final String NOTIFICATION_NOT_FOUND = "Notification not found: ";
    public static final String NOTIFICATION_ACCESS_DENIED = "You do not have access to this notification";

    // ===== Validation messages (use in NotificationRequest annotations) =====
    public static final String USER_ID_REQUIRED = "User id is required";
    public static final String NOTIFICATION_TYPE_REQUIRED = "Notification type is required";
    public static final String TITLE_TOO_LONG = "Title must not exceed 200 characters";
    public static final String MESSAGE_REQUIRED = "Message is required";

    // ===== Notification content templates (use with String.format) =====
    public static final String NEW_ORDER_TITLE = "New order received";
    public static final String NEW_ORDER_MESSAGE = "You have a new order #%s";

    public static final String PAYMENT_PENDING_TITLE = "Payment pending";
    public static final String PAYMENT_PENDING_MESSAGE = "Payment for order #%s is waiting for confirmation";

    public static final String PAYMENT_APPROVED_TITLE = "Payment approved";
    public static final String PAYMENT_APPROVED_MESSAGE = "Payment for order #%s has been approved";

    public static final String LOW_STOCK_TITLE = "Low stock alert";
    public static final String LOW_STOCK_MESSAGE = "%s is running low on stock (%d left)";

    public static final String ORDER_UPDATE_TITLE = "Order update";

}
