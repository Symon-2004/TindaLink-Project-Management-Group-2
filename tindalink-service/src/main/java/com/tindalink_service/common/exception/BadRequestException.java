package com.tindalink_service.common.exception;

public class BadRequestException extends RuntimeException{

    private final String resourceId;

    public BadRequestException(String message){

        super(message);
        this.resourceId = null;
    }

    public BadRequestException(String message, Object Id){

        super(message);
        this.resourceId = String.valueOf(Id);
    }

    public BadRequestException(String message, String resourceId){

        super(message);
        this.resourceId = resourceId;
    }

    public String getResourceId(){

        return resourceId;
    }
}
