package com.example.sweetshop.config;

import com.example.sweetshop.model.AppRole;
import com.example.sweetshop.model.Users;
import com.example.sweetshop.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initUsers(UserRepository userRepository,
                                PasswordEncoder passwordEncoder) {

        return args -> {

            if (userRepository.findByUserName("admin").isEmpty()) {
                userRepository.save(
                        new Users(
                                null,
                                "admin",
                                passwordEncoder.encode("admin123"),
                                AppRole.ROLE_ADMIN
                        )
                );
            }

            if (userRepository.findByUserName("user").isEmpty()) {
                userRepository.save(
                        new Users(
                                null,
                                "user",
                                passwordEncoder.encode("user123"),
                                AppRole.ROLE_USER
                        )
                );
            }
        };
    }
}
