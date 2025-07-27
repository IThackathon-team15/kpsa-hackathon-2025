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


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/medications")
public class MedicationController {

    private final MedicationService medicationService;

    @PostMapping("/{userId}")
    @Operation(summary = "복약 정보 추가", description = "사용자의 복약 정보를 등록합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "등록된 정보",
                    content = @Content(schema = @Schema(implementation = AddMedicationResponse.class)))
    })
    public ResponseEntity<AddMedicationResponse> addMedication(
            @PathVariable Long userId,
            @Valid @RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "복약 추가 요청") AddMedicationRequest request) {
        AddMedicationResponse response = medicationService.addMedication(userId, request);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/{userId}")    @Operation(summary = "복약 정보 조회", description = "사용자의 복약 정보를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "복약 목록",
                    content = @Content(schema = @Schema(implementation = MedicationResponse.class)))
    })
    public ResponseEntity<List<MedicationResponse>> getMedications(@PathVariable Long userId) {
        List<MedicationResponse> response = medicationService.getMedications(userId);
        return ResponseEntity.ok(response);
    }
}