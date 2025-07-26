package com.example.hackathon.dto.medication;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "복약 정보 추가 요청")
public class AddMedicationRequest {
    @NotBlank
    @Schema(description = "약 이름")
    private String medicationName;
    @NotBlank
    @Schema(description = "복용 알림 시간 (HH:mm)")
    private String notificationTime;
}