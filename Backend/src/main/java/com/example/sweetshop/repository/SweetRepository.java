package com.example.sweetshop.repository;

import com.example.sweetshop.model.Sweet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SweetRepository extends JpaRepository<Sweet, Long> {

    Sweet findBySweetName(String sweetName);

}
