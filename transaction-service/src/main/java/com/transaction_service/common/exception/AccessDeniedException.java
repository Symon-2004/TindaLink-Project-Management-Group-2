package com.transaction_service.common.exception;

public class AccessDeniedException extends RuntimeException {

    private final String resourceId;

    public AccessDeniedException(String message){

        super(message);
        this.resourceId = null;
    }

    public AccessDeniedException(String message, Object Id){

        super(message);
        this.resourceId = String.valueOf(Id);
    }

    public AccessDeniedException(String message, String resourceId){
        super(message);
        this.resourceId = resourceId;
    }

    public String getResourceId(){
        return resourceId;
    }
}
