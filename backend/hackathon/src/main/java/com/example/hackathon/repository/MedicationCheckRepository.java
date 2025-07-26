package com.example.hackathon.repository;


import com.example.hackathon.domain.MedicationCheck;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MedicationCheckRepository extends JpaRepository<MedicationCheck, Long> {}