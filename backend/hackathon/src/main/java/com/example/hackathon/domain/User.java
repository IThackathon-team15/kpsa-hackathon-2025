package com.example.hackathon.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users") // 'user'는 DB 예약어일 수 있으므로 'users'로 지정
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firebaseUid;

    private String email;
    private String phoneNumber;

    private String name; // 아마 없을 듯

    private String googleId;
}