package com.example.hackathon.service;

import com.example.hackathon.domain.DailyLog;
import com.example.hackathon.domain.User;
import com.example.hackathon.dto.log.LogCreateRequest;
import com.example.hackathon.dto.log.LogResponse;
import com.example.hackathon.global.code.exception.CustomException;
import com.example.hackathon.global.status.ErrorStatus;
import com.example.hackathon.repository.DailyLogRepository;
import com.example.hackathon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LogService {

    private final DailyLogRepository dailyLogRepository;
    private final UserRepository userRepository;

    @Transactional
    public LogResponse createLog(Long userId, LogCreateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorStatus.USER_NOT_FOUND));

        LocalDate date = LocalDate.parse(request.getLogDate());

        DailyLog log = new DailyLog();
        log.setUser(user);
        log.setLogDate(date);
        log.setSideEffects(request.getSideEffects());
        log.setMemo(request.getMemo());

        DailyLog saved = dailyLogRepository.save(log);

        return new LogResponse(saved.getId(), saved.getLogDate().toString(),
                saved.getSideEffects(), saved.getMemo());
    }

    @Transactional(readOnly = true)
    public List<LogResponse> getLogs(Long userId, int year, int month) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorStatus.USER_NOT_FOUND));

        LocalDate start = LocalDate.of(year, month, 1);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());

        return dailyLogRepository.findAllByUserAndLogDateBetween(user, start, end)
                .stream()
                .map(l -> new LogResponse(l.getId(), l.getLogDate().toString(),
                        l.getSideEffects(), l.getMemo()))
                .collect(Collectors.toList());
    }
}