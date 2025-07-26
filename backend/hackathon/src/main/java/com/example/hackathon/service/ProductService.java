package com.example.hackathon.service;

import com.example.hackathon.domain.Product;
import com.example.hackathon.domain.StoreType;
import com.example.hackathon.dto.product.ProductResponse;
import com.example.hackathon.repository.ProductRepository;
import com.example.hackathon.repository.StoreTypeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final StoreTypeRepository storeTypeRepository;

    private static final Map<String, List<String>> STORE_TYPE_CATEGORY_MAPPING = Map.of(
            "pharmacy", List.of("medicine", "supplement"),
            "health", List.of("health", "diet"),
            "all", List.of("medicine", "supplement", "health", "diet")
    );

    public List<ProductResponse> getProductsByStoreType(String storeType) {
        if (!STORE_TYPE_CATEGORY_MAPPING.containsKey(storeType)) {
            throw new IllegalArgumentException("Invalid store type");
        }
        List<String> categories = STORE_TYPE_CATEGORY_MAPPING.get(storeType);
        List<Product> products = productRepository.findByCategoryIn(categories);
        return products.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> getProductsByAccount(String accountId) {
        String storeType = storeTypeRepository.findByAccountId(accountId)
                .map(StoreType::getStoreType)
                .orElse("all");
        return getProductsByStoreType(storeType);
    }

    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getImageUrl(),
                product.getCategory(),
                product.getPrice()
        );
    }
}