package com.example.hackathon.repository;

import com.example.hackathon.domain.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategoryIn(List<String> categories);
}