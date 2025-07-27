package com.example.hackathon.controller;

import com.example.hackathon.dto.storetype.StoreTypeUpdateRequest;
import com.example.hackathon.dto.storetype.StoreTypeResponse;
import com.example.hackathon.service.StoreTypeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/storetype")
public class StoreTypeController {

    private final StoreTypeService storeTypeService;

    @PostMapping("/update")
    @Operation(summary = "스토어 유형 업데이트", description = "계정에 대한 스토어 유형을 저장하거나 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "저장된 정보",
                    content = @Content(schema = @Schema(implementation = StoreTypeResponse.class)))
    })
    public ResponseEntity<StoreTypeResponse> updateStoreType(@Valid @RequestBody StoreTypeUpdateRequest request) {
        StoreTypeResponse response = storeTypeService.updateStoreType(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{accountId}")
    @Operation(summary = "스토어 유형 조회", description = "계정에 설정된 스토어 유형을 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "스토어 유형",
                    content = @Content(schema = @Schema(implementation = StoreTypeResponse.class)))
    })
    public ResponseEntity<StoreTypeResponse> getStoreType(@PathVariable String accountId) {
        StoreTypeResponse response = storeTypeService.getStoreType(accountId);
        return ResponseEntity.ok(response);
    }
}