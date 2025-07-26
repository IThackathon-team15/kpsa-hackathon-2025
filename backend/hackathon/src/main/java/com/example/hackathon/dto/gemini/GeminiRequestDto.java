package com.example.hackathon.dto.gemini;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Schema(description = "요약 요청")
public class GeminiRequestDto {
    @Schema(description = "요약할 텍스트")
    private String text;
}