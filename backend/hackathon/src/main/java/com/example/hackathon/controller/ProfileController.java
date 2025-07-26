package com.example.hackathon.controller;

import com.example.hackathon.dto.profile.MessageResponse;
import com.example.hackathon.dto.profile.PatientProfileRequest;
import com.example.hackathon.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}