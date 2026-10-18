package com.notification_service.common.exception;

public class ServiceException extends RuntimeException{

    private final String resourceId;

    public ServiceException(String message){

        super(message);
        this.resourceId = null;

    }

    public ServiceException(String message, Object Id){

        super(message);
        this.resourceId = String.valueOf(Id);
    }

    public ServiceException(String message, String resourceId){

        super(message);
        this.resourceId = resourceId;

    }
    public String getResourceId(){

        return resourceId;
    }
}
