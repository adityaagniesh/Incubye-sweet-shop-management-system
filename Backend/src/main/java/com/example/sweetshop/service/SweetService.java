package com.example.sweetshop.service;

import com.example.sweetshop.payload.SweetRequestDTO;
import com.example.sweetshop.payload.SweetResponseDTO;

import java.util.List;

public interface SweetService {
    SweetRequestDTO createSweet(SweetRequestDTO sweetRequestDTO);

    List<SweetResponseDTO> getAllSweets();
}
