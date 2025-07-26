package com.example.hackathon.dto.storetype;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StoreTypeUpdateRequest {
    @NotBlank
    private String accountId;
    @NotBlank
    private String storeType;
}