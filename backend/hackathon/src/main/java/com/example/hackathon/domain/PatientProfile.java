package com.example.hackathon.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PatientProfile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    // --- 수정 및 추가된 필드 ---
    private boolean isKorean; // 내국인(true) / 외국인(false)

    private String gender; // 성별

    private boolean hasCancerDiagnosis; // 암 진단 여부

    private String cancerType; // 암 종류

    private String metastasisLocation; // 암 전이 위치

    @Column(columnDefinition = "TEXT")
    private String geneticMutationInfo; // 유전자 변이 정보

    @Column(columnDefinition = "TEXT")
    private String treatmentHistory; // 치료 이력
}