package com.example.sweetshop.service;

import com.example.sweetshop.model.Users;
import com.example.sweetshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements  UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Users getUserByUsername(String username) {
        return userRepository.findByUserName(username)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with username: " + username
                        )
                );
    }
}
