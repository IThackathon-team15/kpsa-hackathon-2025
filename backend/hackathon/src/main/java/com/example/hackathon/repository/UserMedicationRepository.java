package com.example.hackathon.repository;

import com.example.hackathon.domain.User;
import com.example.hackathon.domain.UserMedication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface UserMedicationRepository extends JpaRepository<UserMedication, Long> {
    // 사용자가 등록한 모든 약 목록을 찾는 메서드
    List<UserMedication> findAllByUser(User user);
}