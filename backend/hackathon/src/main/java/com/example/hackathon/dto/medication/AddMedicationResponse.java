package com.example.hackathon.dto.medication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddMedicationResponse {
    private Long userId;
    private String medicationName;
    private String notificationTime;
}