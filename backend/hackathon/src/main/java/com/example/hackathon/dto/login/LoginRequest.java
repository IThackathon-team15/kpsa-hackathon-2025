package com.example.hackathon.dto.login;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "로그인 요청")
public class LoginRequest {
    @NotBlank
    @Schema(description = "휴대폰 번호")
    private String phoneNumber;
}