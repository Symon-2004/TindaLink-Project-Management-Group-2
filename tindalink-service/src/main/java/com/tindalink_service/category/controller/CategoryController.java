package com.tindalink_service.category.controller;

import com.tindalink_service.category.dto.request.CategoryRequest;
import com.tindalink_service.category.dto.response.CategoryResponse;
import com.tindalink_service.category.service.CategoryService;
import com.tindalink_service.common.utils.LoggerUtils;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

import static com.tindalink_service.category.constant.CategoryMessages.*;
import static com.tindalink_service.common.utils.LoggerUtils.PROCESSING;

@Slf4j
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor

public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<CategoryResponse> create(@Valid @RequestBody CategoryRequest request){

        log.info(LoggerUtils.formatProcess(PROCESSING, CREATING_CATEGORY));

        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.create(request));
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<CategoryResponse>> getByStore(@PathVariable String storeId){

        log.info(LoggerUtils.formatProcess(PROCESSING, RETRIEVING_CATEGORIES));

        return ResponseEntity.ok(categoryService.getByStore(storeId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryResponse> update(@PathVariable String Id, @Valid @RequestBody CategoryRequest request){

        log.info(LoggerUtils.formatProcess(PROCESSING, UPDATING_CATEGORY));

        return ResponseEntity.ok(categoryService.update(Id,request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable String Id){

        log.info(LoggerUtils.formatProcess(PROCESSING, DELETING_CATEGORY));

        categoryService.delete(Id);

        return ResponseEntity.ok(Map.of("message", CATEGORY_DELETED));
    }


}
