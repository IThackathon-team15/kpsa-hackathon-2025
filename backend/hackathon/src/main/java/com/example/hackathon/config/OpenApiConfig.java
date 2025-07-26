package com.example.hackathon.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
        info = @Info(title = "Hackathon API", version = "v1", description = "약학 x IT 해커톤 2025 API 명세"),
        servers = {@Server(url = "/")}
)
public class OpenApiConfig {
}
