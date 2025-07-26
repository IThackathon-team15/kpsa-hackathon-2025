package com.example.hackathon.controller;

import com.example.hackathon.dto.gemini.GeminiRequestDto;
import com.example.hackathon.service.GeminiService;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/summary")
    public String getSummary(
            @RequestBody GeminiRequestDto requestDto) {
        return geminiService.getSummary(requestDto.getText());
    }
}