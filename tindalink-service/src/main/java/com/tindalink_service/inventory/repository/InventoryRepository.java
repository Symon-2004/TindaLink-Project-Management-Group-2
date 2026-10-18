package com.tindalink_service.inventory.repository;

import com.tindalink_service.common.enums.InventoryStatus;
import com.tindalink_service.inventory.Inventory;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InventoryRepository extends MongoRepository<Inventory, String> {

    boolean existsByProductName(String productName);

    List<Inventory> findByStatus(InventoryStatus status);
}
