package com.example.hackathon.controller;

import com.example.hackathon.dto.log.LogCreateRequest;
import com.example.hackathon.dto.log.LogResponse;
import com.example.hackathon.service.LogService;
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
    public ResponseEntity<LogResponse> createLog(@PathVariable Long userId,
                                                 @Valid @RequestBody LogCreateRequest request) {
        LogResponse response = logService.createLog(userId, request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<LogResponse>> getLogs(@PathVariable Long userId,
                                                     @RequestParam int year,
                                                     @RequestParam int month) {
        List<LogResponse> response = logService.getLogs(userId, year, month);
        return ResponseEntity.ok(response);
    }
}