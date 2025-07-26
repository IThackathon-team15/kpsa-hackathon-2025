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

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ProfileController {

    private final ProfileService profileService;

    @PostMapping("/profile/{userId}")
    public ResponseEntity<MessageResponse> saveProfile(
            @PathVariable Long userId,
            @RequestBody PatientProfileRequest request) {
        profileService.saveOrUpdateProfile(userId, request);
        return ResponseEntity.ok(new MessageResponse("프로필이 성공적으로 저장되었습니다."));
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<PatientProfileResponse> getProfile(@PathVariable Long userId) {
        PatientProfileResponse response = profileService.getProfile(userId);
        return ResponseEntity.ok(response);
    }
}