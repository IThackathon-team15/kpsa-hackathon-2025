package com.example.hackathon.dto.medication;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddMedicationRequest {
    @NotBlank
    private String medicationName;
    @NotBlank
    private String notificationTime;
}