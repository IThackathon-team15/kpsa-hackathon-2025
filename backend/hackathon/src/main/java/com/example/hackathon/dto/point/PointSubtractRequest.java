package com.example.hackathon.dto.point;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PointSubtractRequest {
    @NotNull
    private Long userId;

    @Min(1)
    private int points;
}