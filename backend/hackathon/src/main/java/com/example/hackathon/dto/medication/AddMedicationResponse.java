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
@Schema(description = "복약 정보 추가 응답")
public class AddMedicationResponse {
    @Schema(description = "사용자 ID")
    private Long userId;
    @Schema(description = "약 이름")
    private String medicationName;
    @Schema(description = "알림 시간 (HH:mm)")
    private String notificationTime;
}