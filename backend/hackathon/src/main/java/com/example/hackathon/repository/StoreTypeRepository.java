package com.example.hackathon.repository;

import com.example.hackathon.domain.StoreType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StoreTypeRepository extends JpaRepository<StoreType, Long> {
    Optional<StoreType> findByAccountId(String accountId);
}
