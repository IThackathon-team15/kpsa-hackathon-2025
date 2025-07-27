package com.example.hackathon.dto.medication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import io.swagger.v3.oas.annotations.media.Schema;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Schema(description = "복약 정보")
public class MedicationResponse {
    @Schema(description = "복약 ID")
    private Long id;
    @Schema(description = "약 이름")
    private String medicationName;
    @Schema(description = "알림 시간 (HH:mm)")
    private String notificationTime;
}