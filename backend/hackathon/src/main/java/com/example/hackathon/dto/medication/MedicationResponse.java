package com.example.hackathon.dto.medication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MedicationResponse {
    private Long id;
    private String medicationName;
    private String notificationTime;
}