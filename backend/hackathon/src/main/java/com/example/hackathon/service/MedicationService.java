package com.example.hackathon.service;

import com.example.hackathon.domain.User;
import com.example.hackathon.domain.UserMedication;
import com.example.hackathon.dto.medication.AddMedicationRequest;
import com.example.hackathon.dto.medication.AddMedicationResponse;
import com.example.hackathon.dto.medication.MedicationResponse;
import com.example.hackathon.repository.UserMedicationRepository;
import com.example.hackathon.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MedicationService {

    private final UserRepository userRepository;
    private final UserMedicationRepository userMedicationRepository;

    @Transactional
    public AddMedicationResponse addMedication(Long userId, AddMedicationRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        UserMedication medication = new UserMedication();
        medication.setUser(user);
        medication.setMedicationName(request.getMedicationName());
        medication.setNotificationTime(LocalTime.parse(request.getNotificationTime()));

        userMedicationRepository.save(medication);

        return new AddMedicationResponse(user.getId(), medication.getMedicationName(),
                medication.getNotificationTime().toString());
    }

    @Transactional
    public List<MedicationResponse> getMedications(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        return userMedicationRepository.findAllByUser(user).stream()
                .map(m -> new MedicationResponse(
                        m.getId(),
                        m.getMedicationName(),
                        m.getNotificationTime().toString()))
                .collect(Collectors.toList());
    }
}