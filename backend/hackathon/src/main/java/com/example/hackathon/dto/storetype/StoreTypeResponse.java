package com.example.hackathon.dto.storetype;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StoreTypeResponse {
    private String accountId;
    private String storeType;
    private String updatedAt;
}