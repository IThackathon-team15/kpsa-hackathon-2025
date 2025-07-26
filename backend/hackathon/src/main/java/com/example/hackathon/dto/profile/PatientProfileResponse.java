package com.example.hackathon.dto.profile;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PatientProfileResponse {
    private String phoneNumber;
    private String name;
    private String cancerType;
    private Integer cancerStage;
    private String treatmentHistory;
}