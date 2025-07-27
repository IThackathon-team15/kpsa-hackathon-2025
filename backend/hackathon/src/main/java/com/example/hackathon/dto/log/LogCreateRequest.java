package com.example.hackathon.dto.log;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class LogCreateRequest {
    @NotBlank
    private String logDate; // yyyy-MM-dd 형식
    private String sideEffects;
    private String memo;
}