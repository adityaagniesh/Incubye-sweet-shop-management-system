package com.example.sweetshop.service;

import com.example.sweetshop.model.SweetCategory;
import com.example.sweetshop.payload.SweetRequestDTO;
import com.example.sweetshop.payload.SweetResponseDTO;
import jakarta.validation.Valid;

import java.util.List;

public interface SweetService {
    SweetRequestDTO createSweet(SweetRequestDTO sweetRequestDTO);

    List<SweetResponseDTO> getAllSweets();

    List<SweetResponseDTO> searchSweets(String sweetName, SweetCategory sweetCategory, Double minPrice, Double maxPrice);

    SweetResponseDTO updateSweet(Long sweetId, @Valid SweetRequestDTO requestDTO);
}
