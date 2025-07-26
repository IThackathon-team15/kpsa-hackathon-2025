package com.example.hackathon.service;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class GeminiService {

    private final Client client;

    public String getSummary(String complexText) {
        String prompt = "다음 의료 정보를 일반인 환자가 이해하기 쉽게 매우 간단하고 친절한 어조로 요약해줘: " + complexText;

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-2.5-flash",
                        prompt,
                        null);

        System.out.println(response.text());
        return response.text();
    }
}