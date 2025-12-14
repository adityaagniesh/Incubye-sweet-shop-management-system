package com.example.sweetshop.payload;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequestDTO {
    @NotBlank
    private String userName;

    @NotBlank
    private String password;
}
