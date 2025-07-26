package com.example.hackathon.service;

import com.example.hackathon.domain.User;
import com.example.hackathon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public void processUserAuthentication(String uid, String email, String name) {
        // Firebase UID로 우리 DB에서 사용자를 조회
        userRepository.findByFirebaseUid(uid)
                // 만약 사용자가 존재하지 않으면, 새로 생성하여 저장 (orElseGet 사용)
                .orElseGet(() -> {
                    // 이름이 null일 경우, 이메일에서 @ 앞부분을 이름으로 사용
                    String newName = (name != null && !name.isEmpty()) ? name : email.split("@")[0];

                    return userRepository.save(
                            User.builder()
                                    .firebaseUid(uid)
                                    .email(email)
                                    .name(newName)
                                    .build()
                    );
                });
    }
}
