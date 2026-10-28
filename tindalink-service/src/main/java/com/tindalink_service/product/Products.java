package com.tindalink_service.product;

import com.tindalink_service.common.enums.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

@Document(collection = "products")
@CompoundIndex(name = "store_name_idx", def = "{'storeId': 1, 'name': 1}", unique = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Products {

    @Id
    private String id;

    @Indexed
    private String storeId;

    private String categoryId;

    private String inventoryId;

    private String name;

    private String description;

    private BigDecimal price;

    private List<String> imageUrls;

    @Builder.Default
    private ProductStatus status = ProductStatus.DRAFT;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;

}
