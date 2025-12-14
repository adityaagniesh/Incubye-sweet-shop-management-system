package com.example.sweetshop.service;

import com.example.sweetshop.model.Users;
import com.example.sweetshop.payload.SignupRequestDTO;
import com.example.sweetshop.payload.SignupResponseDTO;

public interface UserService {
    Users getUserByUsername(String username);

    SignupResponseDTO registerUser(SignupRequestDTO requestDTO);
}
