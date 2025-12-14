package com.example.sweetshop.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupResponseDTO {

    private Long userId;
    private String userName;
    private String role;
}
