package com.example.hackathon.repository;

import com.example.hackathon.domain.DailyLog;
import com.example.hackathon.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface DailyLogRepository extends JpaRepository<DailyLog, Long> {
    // 특정 사용자의 특정 날짜 기록을 찾는 메서드
    Optional<DailyLog> findByUserAndLogDate(User user, LocalDate logDate);

    // 특정 사용자의 특정 기간 동안의 모든 기록을 찾는 메서드 (캘린더 월별 조회 시 사용)
    List<DailyLog> findAllByUserAndLogDateBetween(User user, LocalDate startDate, LocalDate endDate);
}