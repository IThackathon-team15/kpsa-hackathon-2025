package com.example.hackathon.service;

import com.example.hackathon.domain.User;
import com.example.hackathon.dto.login.LoginResponse;
import com.example.hackathon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final UserRepository userRepository;

    public LoginResponse loginByPhoneNumber(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber)
                .map(user -> new LoginResponse(true, "로그인되었습니다"))
                .orElseGet(() -> {
                    User newUser = User.builder()
                            .phoneNumber(phoneNumber)
                            .googleId("PHONE_" + phoneNumber)
                            .build();
                    userRepository.save(newUser);
                    return new LoginResponse(false, "회원가입되었습니다");
                });
    }
}