package com.example.hackathon.controller;

import com.example.hackathon.dto.medication.AddMedicationRequest;
import com.example.hackathon.dto.medication.AddMedicationResponse;
import com.example.hackathon.dto.medication.MedicationResponse;
import com.example.hackathon.service.MedicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{userId}")
    public ResponseEntity<List<MedicationResponse>> getMedications(@PathVariable Long userId) {
        List<MedicationResponse> response = medicationService.getMedications(userId);
        return ResponseEntity.ok(response);
    }
}