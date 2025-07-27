package com.example.hackathon.service;

import com.example.hackathon.domain.Points;
import com.example.hackathon.domain.User;
import com.example.hackathon.dto.point.PointAddRequest;
import com.example.hackathon.dto.point.PointResponse;
import com.example.hackathon.dto.point.PointSubtractRequest;
import com.example.hackathon.global.code.exception.CustomException;
import com.example.hackathon.global.status.ErrorStatus;
import com.example.hackathon.repository.PointRepository;
import com.example.hackathon.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class PointService {

    private final PointRepository pointsRepository;
    private final UserRepository userRepository;

    @Transactional
    public PointResponse addPoints(PointAddRequest request) {
        if (request.getPoints() <= 0) {
            throw new CustomException(ErrorStatus.POINTS_INVALID_AMOUNT);
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new CustomException(ErrorStatus.USER_NOT_FOUND));

        Points points = pointsRepository.findByUser(user)
                .orElseGet(() -> {
                    Points p = new Points();
                    p.setUser(user);
                    return p;
                });

        points.setCurrentPoints(points.getCurrentPoints() + request.getPoints());
        points.setUpdatedAt(LocalDateTime.now());
        pointsRepository.save(points);

        return new PointResponse(user.getId(), points.getCurrentPoints(), points.getUpdatedAt().toString());
    }

    @Transactional
    public PointResponse subtractPoints(PointSubtractRequest request) {
        if (request.getPoints() <= 0) {
            throw new CustomException(ErrorStatus.POINTS_INVALID_AMOUNT);
        }

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new CustomException(ErrorStatus.USER_NOT_FOUND));

        Points points = pointsRepository.findByUser(user)
                .orElseThrow(() -> new CustomException(ErrorStatus.USER_NOT_FOUND));

        if (points.getCurrentPoints() < request.getPoints()) {
            throw new CustomException(ErrorStatus.POINTS_INSUFFICIENT);
        }

        points.setCurrentPoints(points.getCurrentPoints() - request.getPoints());
        points.setUpdatedAt(LocalDateTime.now());
        pointsRepository.save(points);

        return new PointResponse(user.getId(), points.getCurrentPoints(), points.getUpdatedAt().toString());
    }

    @Transactional
    public PointResponse getPoints(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorStatus.USER_NOT_FOUND));

        Points points = pointsRepository.findByUser(user)
                .orElseGet(() -> {
                    Points p = new Points();
                    p.setUser(user);
                    p.setCurrentPoints(0);
                    p.setUpdatedAt(LocalDateTime.now());
                    return pointsRepository.save(p);
                });

        return new PointResponse(user.getId(), points.getCurrentPoints(), points.getUpdatedAt().toString());
    }
}