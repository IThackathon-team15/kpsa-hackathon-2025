package com.example.hackathon.service;

import com.example.hackathon.domain.PatientProfile;
import com.example.hackathon.domain.User;
import com.example.hackathon.dto.profile.PatientProfileRequest;
import com.example.hackathon.repository.PatientProfileRepository;
import com.example.hackathon.repository.UserRepository;
import com.example.hackathon.global.code.exception.CustomException;
import com.example.hackathon.global.status.ErrorStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private final PatientProfileRepository patientProfileRepository;
    private final UserRepository userRepository;

    public void saveOrUpdateProfile(Long userId, PatientProfileRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ErrorStatus.USER_NOT_FOUND));

        PatientProfile profile = patientProfileRepository.findByUser_Id(userId)
                .orElseGet(PatientProfile::new);

        profile.setUser(user);
        profile.setKorean(request.isKorean());
        profile.setGender(request.getGender());
        profile.setHasCancerDiagnosis(request.isHasCancerDiagnosis());
        profile.setCancerType(request.getCancerType());
        profile.setMetastasisLocation(request.getMetastasisLocation());
        profile.setGeneticMutationInfo(request.getGeneticMutationInfo());
        profile.setTreatmentHistory(request.getTreatmentHistory());

        patientProfileRepository.save(profile);
    }
}