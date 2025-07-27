package com.example.hackathon.controller;

import com.example.hackathon.dto.profile.MessageResponse;
import com.example.hackathon.dto.profile.PatientProfileRequest;
import com.example.hackathon.dto.profile.PatientProfileResponse;
import com.example.hackathon.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping("/profile/{userId}")
    @Operation(summary = "프로필 저장", description = "사용자의 프로필 정보를 저장하거나 수정합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "저장 결과",
                    content = @Content(schema = @Schema(implementation = MessageResponse.class)))
    })
    public ResponseEntity<MessageResponse> saveProfile(
            @PathVariable Long userId,
            @RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "프로필 정보") PatientProfileRequest request) {

        profileService.saveOrUpdateProfile(userId, request);
        return ResponseEntity.ok(new MessageResponse("프로필이 성공적으로 저장되었습니다."));
    }

    @GetMapping("/profile/{userId}")
    @Operation(summary = "프로필 조회", description = "사용자의 프로필 정보를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "프로필 정보",
                    content = @Content(schema = @Schema(implementation = PatientProfileResponse.class)))
    })
    public ResponseEntity<PatientProfileResponse> getProfile(@PathVariable Long userId) {
        PatientProfileResponse response = profileService.getProfile(userId);
        return ResponseEntity.ok(response);
    }
}