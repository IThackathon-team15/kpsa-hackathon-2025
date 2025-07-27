package com.example.hackathon.config;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(
                title = "Hackathon API",
                description = "약학 x IT 해커톤 백엔드 API 명세",
                version = "v1"
        )
)
public class OpenApiConfig {
}