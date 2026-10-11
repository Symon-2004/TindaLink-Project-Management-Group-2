package com.tindalink_service.common.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse<T> {

    private int statusCode;

    private String resourceId;

    private String message;

    private T data;


}
