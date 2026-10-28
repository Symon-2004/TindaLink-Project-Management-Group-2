package com.transaction_service.common.exception;


public class NotFoundException extends RuntimeException{

    private final String resourceId;

    public NotFoundException(String message){

        super(message);
        this.resourceId = null;
    }

    public NotFoundException(String message, String resourceId){

        super(message);
        this.resourceId = resourceId;

    }

    public String getResourceId(){

        return  resourceId;
    }
}
