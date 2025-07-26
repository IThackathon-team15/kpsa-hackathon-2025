package com.example.hackathon.controller;

import com.example.hackathon.dto.point.PointAddRequest;
import com.example.hackathon.dto.point.PointResponse;
import com.example.hackathon.dto.point.PointSubtractRequest;
import com.example.hackathon.service.PointService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/points")
public class PointController {

    private final PointService pointsService;

    @PostMapping("/add")
    public ResponseEntity<PointResponse> addPoints(@Valid @RequestBody PointAddRequest request) {
        PointResponse response = pointsService.addPoints(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/subtract")
    public ResponseEntity<PointResponse> subtractPoints(@Valid @RequestBody PointSubtractRequest request) {
        PointResponse response = pointsService.subtractPoints(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<PointResponse> getPoints(@PathVariable Long userId) {
        PointResponse response = pointsService.getPoints(userId);
        return ResponseEntity.ok(response);
    }
}