package com.example.hackathon.service;

import com.example.hackathon.domain.StoreType;
import com.example.hackathon.dto.storetype.StoreTypeUpdateRequest;
import com.example.hackathon.dto.storetype.StoreTypeResponse;
import com.example.hackathon.repository.StoreTypeRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class StoreTypeService {

    private final StoreTypeRepository storeTypeRepository;

    @Transactional
    public StoreTypeResponse updateStoreType(StoreTypeUpdateRequest request) {
        StoreType record = storeTypeRepository.findByAccountId(request.getAccountId())
                .orElseGet(StoreType::new);

        record.setAccountId(request.getAccountId());
        record.setStoreType(request.getStoreType());
        record.setUpdatedAt(LocalDateTime.now());

        storeTypeRepository.save(record);

        return new StoreTypeResponse(
                record.getAccountId(),
                record.getStoreType(),
                record.getUpdatedAt().toString()
        );
    }

    @Transactional
    public StoreTypeResponse getStoreType(String accountId) {
        StoreType record = storeTypeRepository.findByAccountId(accountId)
                .orElseGet(() -> {
                    StoreType s = new StoreType();
                    s.setAccountId(accountId);
                    s.setStoreType("all");
                    s.setUpdatedAt(LocalDateTime.now());
                    return storeTypeRepository.save(s);
                });

        return new StoreTypeResponse(
                record.getAccountId(),
                record.getStoreType(),
                record.getUpdatedAt().toString()
        );
    }
}