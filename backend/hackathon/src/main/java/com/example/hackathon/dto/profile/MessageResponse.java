package com.example.hackathon.dto.profile;

import lombok.AllArgsConstructor;
import lombok.Getter;

import io.swagger.v3.oas.annotations.media.Schema;

@Getter
@AllArgsConstructor
@Schema(description = "메시지 응답")
public class MessageResponse {
    @Schema(description = "메시지")
    private String message;
}