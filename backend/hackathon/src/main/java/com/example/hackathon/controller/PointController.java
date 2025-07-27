package com.example.hackathon.controller;

import com.example.hackathon.dto.point.PointAddRequest;
import com.example.hackathon.dto.point.PointResponse;
import com.example.hackathon.dto.point.PointSubtractRequest;
import com.example.hackathon.service.PointService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    @Operation(summary = "포인트 추가", description = "사용자에게 포인트를 추가합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "포인트 정보",
                    content = @Content(schema = @Schema(implementation = PointResponse.class)))
    })
    public ResponseEntity<PointResponse> addPoints(@Valid @RequestBody PointAddRequest request) {
        PointResponse response = pointsService.addPoints(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/subtract")
    @Operation(summary = "포인트 차감", description = "사용자의 포인트를 차감합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "포인트 정보",
                    content = @Content(schema = @Schema(implementation = PointResponse.class)))
    })
    public ResponseEntity<PointResponse> subtractPoints(@Valid @RequestBody PointSubtractRequest request) {
        PointResponse response = pointsService.subtractPoints(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    @Operation(summary = "포인트 조회", description = "사용자의 현재 포인트를 조회합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "포인트 정보",
                    content = @Content(schema = @Schema(implementation = PointResponse.class)))
    })
    public ResponseEntity<PointResponse> getPoints(@PathVariable Long userId) {
        PointResponse response = pointsService.getPoints(userId);
        return ResponseEntity.ok(response);
    }
}