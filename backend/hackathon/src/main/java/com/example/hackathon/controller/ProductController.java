package com.example.hackathon.controller;

import com.example.hackathon.dto.product.ProductResponse;
import com.example.hackathon.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    @Operation(summary = "스토어 유형별 상품 조회", description = "스토어 유형에 해당하는 상품 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "상품 목록",
                    content = @Content(schema = @Schema(implementation = ProductResponse.class)))
    })
    public ResponseEntity<List<ProductResponse>> getByStoreType(@PathVariable String storeType) {
        List<ProductResponse> responses = productService.getProductsByStoreType(storeType);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/by-account/{accountId}")
    @Operation(summary = "계정별 추천 상품 조회", description = "계정의 스토어 유형을 기준으로 상품 목록을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "상품 목록",
                    content = @Content(schema = @Schema(implementation = ProductResponse.class)))
    })
    public ResponseEntity<List<ProductResponse>> getByAccount(@PathVariable String accountId) {
        List<ProductResponse> responses = productService.getProductsByAccount(accountId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping
    @Operation(summary = "전체 상품 조회", description = "모든 상품을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "상품 목록",
                    content = @Content(schema = @Schema(implementation = ProductResponse.class)))
    })
    public ResponseEntity<List<ProductResponse>> getAll() {
        List<ProductResponse> responses = productService.getAllProducts();
        return ResponseEntity.ok(responses);
    }
}