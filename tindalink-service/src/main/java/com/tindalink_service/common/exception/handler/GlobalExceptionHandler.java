package com.tindalink_service.common.exception.handler;


import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.INTERNAL_SERVER_ERROR;
import static org.springframework.http.HttpStatus.NOT_FOUND;

import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.tindalink_service.common.utils.LoggerUtils;
import com.tindalink_service.common.utils.ResponseUtils;
import com.tindalink_service.common.exception.AccessDeniedException;
import com.tindalink_service.common.exception.BadRequestException;
import com.tindalink_service.common.exception.NotFoundException;
import com.tindalink_service.common.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationExceptions(MethodArgumentNotValidException ex){

        Map<String, String> fieldErrors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage,(message1, messages) -> message1
                ));

        log.error(LoggerUtils.formatError(BAD_REQUEST.name(), fieldErrors.toString()));

        return ResponseEntity
                .status(BAD_REQUEST)
                .body(ResponseUtils.buildErrorResponse(BAD_REQUEST, "INVALID_REQUEST", fieldErrors));

    }

    @ExceptionHandler(BindException.class)
    public ResponseEntity<?> handleBindException(BindException ex){

        Map<String, String> fieldErrors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage,(messages1, message2) ->messages1));

        log.error(LoggerUtils.formatError(BAD_REQUEST.name(), fieldErrors.toString()));

        return ResponseEntity
                .status(BAD_REQUEST)
                .body(ResponseUtils.buildErrorResponse(BAD_REQUEST,"INVALID_REQUEST"));
    }

    @ExceptionHandler(InvalidFormatException.class)
    public ResponseEntity<?> handleInvalidFormat(InvalidFormatException ex){

        if(ex.getTargetType()!= null
            && ex.getTargetType().isEnum()){

            String field = "unknown";

            if(!ex.getPath().isEmpty()
                && ex.getPath().get(0).getFieldName() != null){

                field = ex.getPath()
                        .get(0)
                        .getFieldName();
            }

            String message = String.format("Invalid value '%s' for field '%s'. Allowed values: %s",
                    ex.getValue(), field, Arrays.toString(ex.getTargetType().getEnumConstants()));

            log.error(LoggerUtils.formatError(BAD_REQUEST.name(), message)
            );

            return ResponseEntity
                    .status(BAD_REQUEST)
                    .body(ResponseUtils.buildErrorResponse(BAD_REQUEST,"INVALID_FORMAT",message));

        }
        return ResponseEntity
                .status(BAD_REQUEST)
                .body(ResponseUtils.buildErrorResponse(BAD_REQUEST, "INVALID_FORMAT"));

    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<?> handleTypeMismatch(MethodArgumentTypeMismatchException ex){

        String name = ex.getName();

        String type = ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName(): "unknown";

        Object value = ex.getValue();

        String message = String.format("Parameter '%s' must be of type %s. Received: %s", name, type, value);

        log.error(LoggerUtils.formatError(BAD_REQUEST.name(),message));

        return ResponseEntity
                .status(BAD_REQUEST)
                .body(ResponseUtils.buildErrorResponse(BAD_REQUEST, "TYPE_MISMATCH", message));
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> handleBadRequestError(BadRequestException ex){

        log.error(LoggerUtils.formatError(BAD_REQUEST.name(),ex.getMessage(), ex.getResourceId()));

        return ResponseEntity
                .status(BAD_REQUEST)
                .body(ResponseUtils.buildErrorResponse(BAD_REQUEST, ex.getResourceId(), ex.getMessage()));
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<?> handleNotFoundException(NotFoundException ex){

        log.error(LoggerUtils.formatError(NOT_FOUND.name(), ex.getMessage(), ex.getResourceId()));

        return ResponseEntity
                .status(NOT_FOUND)
                .body(ResponseUtils.buildErrorResponse(NOT_FOUND, ex.getResourceId(), ex.getMessage()));
    }

    @ExceptionHandler(ServiceException.class)
    public ResponseEntity<?> handleServiceException(ServiceException ex){

        log.error(LoggerUtils.formatError(INTERNAL_SERVER_ERROR.name(),ex.getMessage(), ex.getResourceId()));

        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(ResponseUtils.buildErrorResponse(INTERNAL_SERVER_ERROR, ex.getResourceId(), ex.getMessage()));
    }


}