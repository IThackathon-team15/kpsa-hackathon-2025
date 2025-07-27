package com.example.hackathon.dto.profile;

import lombok.AllArgsConstructor;
import lombok.Getter;
import io.swagger.v3.oas.annotations.media.Schema;

@Getter
@AllArgsConstructor
@Schema(description = "환자 프로필 응답")
public class PatientProfileResponse {
    @Schema(description = "전화번호")
    private String phoneNumber;
    @Schema(description = "이름")
    private String name;
    @Schema(description = "암 종류")
    private String cancerType;
    @Schema(description = "암 병기")
    private Integer cancerStage;
    @Schema(description = "치료 이력")
    private String treatmentHistory;
}