package com.example.hackathon.dto.log;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LogResponse {
    private Long id;
    private String logDate;
    private String sideEffects;
    private String memo;
}