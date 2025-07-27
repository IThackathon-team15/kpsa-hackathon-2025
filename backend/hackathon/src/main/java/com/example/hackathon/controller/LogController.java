package com.example.hackathon.controller;

import com.example.hackathon.dto.log.LogCreateRequest;
import com.example.hackathon.dto.log.LogResponse;
import com.example.hackathon.service.LogService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/logs") // 캘린더 조회
public class LogController {

    private final LogService logService;

    @PostMapping("/{userId}")
    @Operation(summary = "복약 로그 추가", description = "사용자의 복약 일지를 생성합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "생성된 로그",
                    content = @Content(schema = @Schema(implementation = LogResponse.class)))
    })
    public ResponseEntity<LogResponse> createLog(@PathVariable Long userId,
                                                 @Valid @RequestBody LogCreateRequest request) {
        LogResponse response = logService.createLog(userId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    @Operation(summary = "복약 로그 조회", description = "사용자의 연도와 월별 복약 일지를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "로그 목록",
                    content = @Content(schema = @Schema(implementation = LogResponse.class)))
    })
    public ResponseEntity<List<LogResponse>> getLogs(@PathVariable Long userId,
                                                     @RequestParam int year,
                                                     @RequestParam int month) {
        List<LogResponse> response = logService.getLogs(userId, year, month);
        return ResponseEntity.ok(response);
    }
}