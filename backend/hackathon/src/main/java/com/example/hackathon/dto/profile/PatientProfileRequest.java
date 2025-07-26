package com.example.hackathon.dto.profile;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PatientProfileRequest {
    private boolean isKorean;
    private String gender;
    private boolean hasCancerDiagnosis;
    private String cancerType;
    private String metastasisLocation;
    private String geneticMutationInfo;
    private String treatmentHistory;
}