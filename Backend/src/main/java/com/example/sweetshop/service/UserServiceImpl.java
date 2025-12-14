package com.example.sweetshop.service;

import com.example.sweetshop.model.AppRole;
import com.example.sweetshop.model.Users;
import com.example.sweetshop.payload.SignupRequestDTO;
import com.example.sweetshop.payload.SignupResponseDTO;
import com.example.sweetshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements  UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Users getUserByUsername(String username) {
        return userRepository.findByUserName(username)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with username: " + username
                        )
                );
    }

    @Override
    public SignupResponseDTO registerUser(SignupRequestDTO requestDTO) {

        if (userRepository.existsByUserName(requestDTO.getUserName())) {
            throw new RuntimeException("Username already exists");
        }

        Users user = new Users();
        user.setUserName(requestDTO.getUserName());
        user.setPassword(passwordEncoder.encode(requestDTO.getPassword()));
        user.setRole(AppRole.ROLE_USER);

        Users savedUser = userRepository.save(user);

        return new SignupResponseDTO(
                savedUser.getUserId(),
                savedUser.getUserName(),
                savedUser.getRole().name()
        );
    }
}
