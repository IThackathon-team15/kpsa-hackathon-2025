package com.example.hackathon.controller;

import com.example.hackathon.dto.login.LoginRequest;
import com.example.hackathon.dto.login.LoginResponse;
import com.example.hackathon.service.LoginService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;

    @PostMapping("/login")
    @Operation(summary = "로그인", description = "휴대폰 번호로 로그인합니다. 신규 사용자는 자동 등록됩니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그인 결과",
                    content = @Content(schema = @Schema(implementation = LoginResponse.class)))
    })
    public ResponseEntity<LoginResponse> login(
            @Valid @RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "로그인 요청") LoginRequest request) {        LoginResponse response = loginService.loginByPhoneNumber(request.getPhoneNumber());

        return ResponseEntity.ok(response);
    }
}