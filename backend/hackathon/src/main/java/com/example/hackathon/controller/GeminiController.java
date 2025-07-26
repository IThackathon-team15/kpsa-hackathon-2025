package com.example.hackathon.controller;

import com.example.hackathon.dto.gemini.GeminiRequestDto;
import com.example.hackathon.service.GeminiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/ai")
public class GeminiController {

    private final GeminiService geminiService;

    @GetMapping("/summary")
    @Operation(summary = "의료 정보 요약", description = "전달된 텍스트를 환자용으로 간단히 요약합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "요약 결과",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
    public String getSummary(
            @RequestBody
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "요약할 텍스트") GeminiRequestDto requestDto) {
        return geminiService.getSummary(requestDto.getText());
    }
}