package com.example.hackathon.dto.gemini;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(description = "요약 응답")
public class GeminiResponseDto {

    @Schema(description = "요약 결과")
    private final String summary;

    public GeminiResponseDto(String summary) {
        this.summary = summary;
    }
}
