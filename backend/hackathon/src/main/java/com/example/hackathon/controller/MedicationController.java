package com.example.hackathon.controller;

import com.example.hackathon.dto.medication.AddMedicationRequest;
import com.example.hackathon.dto.medication.AddMedicationResponse;
import com.example.hackathon.service.MedicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/medications")
public class MedicationController {

    private final MedicationService medicationService;

    @PostMapping("/{userId}")
    public ResponseEntity<AddMedicationResponse> addMedication(
            @PathVariable Long userId,
            @Valid @RequestBody AddMedicationRequest request) {
        AddMedicationResponse response = medicationService.addMedication(userId, request);
        return ResponseEntity.ok(response);
    }
}