package com.example.hackathon.controller;

import com.example.hackathon.dto.gemini.GeminiRequestDto;
import com.example.hackathon.service.GeminiService;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/ai")
public class GeminiController {

    private final GeminiService geminiService;


    @Operation(summary = "텍스트 요약", description = "Gemini API를 통해 텍스트를 요약합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "요약 결과",
                    content = @Content(schema = @Schema(implementation = String.class)))
    })
    @GetMapping("/summary")
    public String getSummary(
        @RequestBody
        @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "요약 요청") GeminiRequestDto requestDto)
    {
            return geminiService.getSummary(requestDto.getText());
        }
    }

}
