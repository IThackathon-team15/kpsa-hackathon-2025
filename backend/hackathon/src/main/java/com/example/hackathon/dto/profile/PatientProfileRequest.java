package com.example.hackathon.dto.profile;

import lombok.Getter;
import lombok.NoArgsConstructor;

import io.swagger.v3.oas.annotations.media.Schema;

@Getter
@NoArgsConstructor
@Schema(description = "환자 프로필 저장 요청")
public class PatientProfileRequest {
    @Schema(description = "한국인 여부")
    private boolean isKorean;
    @Schema(description = "성별")
    private String gender;
    @Schema(description = "암 진단 여부")
    private boolean hasCancerDiagnosis;
    @Schema(description = "암 종류")
    private String cancerType;
    @Schema(description = "전이 위치")
    private String metastasisLocation;
    @Schema(description = "유전 변이 정보")
    private String geneticMutationInfo;
    @Schema(description = "치료 이력")
    private String treatmentHistory;
    @Schema(description = "암 병기")
    private Integer cancerStage;
}