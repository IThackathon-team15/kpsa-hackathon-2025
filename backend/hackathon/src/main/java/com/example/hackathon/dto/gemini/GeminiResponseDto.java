package com.example.hackathon.dto.gemini;

import lombok.Getter;

@Getter
public class GeminiResponseDto {
    private final String summary;

    public GeminiResponseDto(String summary) {
        this.summary = summary;
    }
}
