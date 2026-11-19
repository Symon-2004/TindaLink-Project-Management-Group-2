package com.tindalink_service.checkout.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReleaseRequest {
    private String userId;
    private List<ReservedItemDto> items;
    private boolean restoreCart;
}
