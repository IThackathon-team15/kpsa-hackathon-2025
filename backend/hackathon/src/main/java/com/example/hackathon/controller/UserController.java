package com.example.hackathon.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class UserController {
    /**
     * 인증 테스트를 위한 간단한 API
     * @param authentication Spring Security가 자동으로 주입해주는 인증 정보 객체
     * @return 로그인한 사용자의 UID를 포함한 환영 메시지
     */
    @GetMapping("/api/user")
    public ResponseEntity<String> test(Authentication authentication) {
        // Authentication 객체에서 사용자의 Firebase UID를 가져옵니다.
        // (FirebaseTokenFilter에서 Principal로 UID를 설정했기 때문입니다.)
        String userUid = authentication.getName();

        // 응답 메시지를 생성하여 반환합니다.
        String responseMessage = "Hello, authenticated user! ";

        return ResponseEntity.ok(responseMessage);
    }
}