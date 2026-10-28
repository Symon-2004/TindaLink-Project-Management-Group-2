package com.tindalink_service.inventory.service;

import com.mongodb.client.ListSearchIndexesIterable;
import com.networknt.schema.OutputFormat;
import com.tindalink_service.common.enums.InventoryStatus;
import com.tindalink_service.common.exception.BadRequestException;
import com.tindalink_service.common.exception.NotFoundException;
import com.tindalink_service.inventory.Inventory;
import com.tindalink_service.inventory.dto.request.InventoryRequest;
import com.tindalink_service.inventory.dto.response.InventoryResponse;
import com.tindalink_service.inventory.repository.InventoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.mongodb.core.aggregation.ArrayOperators;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.tindalink_service.inventory.constant.InventoryMessages.INVENTORY_ALREADY_EXIST;
import static com.tindalink_service.inventory.constant.InventoryMessages.INVENTORY_NOT_FOUND;

@Service
@RequiredArgsConstructor
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    @Value("${inventory.low-stock-threshold:10}")
    private int lowStockTreshold;

    public InventoryResponse create(InventoryRequest request) {

        if (inventoryRepository.existsByProductName(request.getProductName())) {

            throw new BadRequestException(INVENTORY_ALREADY_EXIST + request.getProductName());
        }
        Inventory saved = inventoryRepository.save(
                Inventory.builder()
                        .productName(request.getProductName())
                        .stockQuantity(request.getStockQuantity())
                        .status(resolveStatus(request.getStockQuantity()))
                        .build()
        );
        return toResponse(saved);
    }

    public List<InventoryResponse> getAll (InventoryStatus status){

        List <Inventory> items = (status == null) ? inventoryRepository.findAll() : inventoryRepository.findByStatus(status);

        return items.stream().map(this::toResponse).toList();
    }

    private Inventory findOrThrow(String id){

        return inventoryRepository.findById(id).orElseThrow(() -> new NotFoundException(INVENTORY_NOT_FOUND + id));

    }

    private InventoryStatus resolveStatus(int quantity){

        return quantity <= lowStockTreshold ? InventoryStatus.LOW_STOCK : InventoryStatus.IN_STOCK;

    }


    public InventoryResponse getById(String id){
        return toResponse (findOrThrow(id));
    }

    public InventoryResponse update (String id, InventoryRequest request){

        Inventory item = findOrThrow(id);

        if(!item.getProductName().equals(request.getProductName())

            && inventoryRepository.existsByProductName(request.getProductName())){
            throw new BadRequestException(INVENTORY_ALREADY_EXIST + request.getProductName());
        }

        item.setProductName(request.getProductName());
        item.setStockQuantity(request.getStockQuantity());
        item.setStatus(resolveStatus(request.getStockQuantity()));

        return toResponse(inventoryRepository.save(item));

    }

    public void delete(String id){

        if(!inventoryRepository.existsById(id)){
            throw new NotFoundException(INVENTORY_NOT_FOUND + id);
        }
        inventoryRepository.deleteById(id);
    }

    private InventoryResponse toResponse(Inventory inventory){
        return InventoryResponse.builder()
                .id(inventory.getId())
                .productName(inventory.getProductName())
                .stockQuantity(inventory.getStockQuantity())
                .status(inventory.getStatus())
                .updatedAt(inventory.getUpdatedAt())
                .build();
    }


}
