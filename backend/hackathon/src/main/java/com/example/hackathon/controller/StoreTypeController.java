package com.example.hackathon.controller;

import com.example.hackathon.dto.storetype.StoreTypeUpdateRequest;
import com.example.hackathon.dto.storetype.StoreTypeResponse;
import com.example.hackathon.service.StoreTypeService;
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
    public ResponseEntity<StoreTypeResponse> updateStoreType(@Valid @RequestBody StoreTypeUpdateRequest request) {
        StoreTypeResponse response = storeTypeService.updateStoreType(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<StoreTypeResponse> getStoreType(@PathVariable String accountId) {
        StoreTypeResponse response = storeTypeService.getStoreType(accountId);
        return ResponseEntity.ok(response);
    }
}