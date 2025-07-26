package com.example.hackathon.controller;

import com.example.hackathon.dto.product.ProductResponse;
import com.example.hackathon.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    @GetMapping("/by-storetype/{storeType}")
    public ResponseEntity<List<ProductResponse>> getByStoreType(@PathVariable String storeType) {
        List<ProductResponse> responses = productService.getProductsByStoreType(storeType);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/by-account/{accountId}")
    public ResponseEntity<List<ProductResponse>> getByAccount(@PathVariable String accountId) {
        List<ProductResponse> responses = productService.getProductsByAccount(accountId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping
    public ResponseEntity<List<ProductResponse>> getAll() {
        List<ProductResponse> responses = productService.getAllProducts();
        return ResponseEntity.ok(responses);
    }
}