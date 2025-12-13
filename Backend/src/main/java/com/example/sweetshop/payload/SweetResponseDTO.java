package com.example.sweetshop.payload;

import com.example.sweetshop.model.SweetCategory;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SweetResponseDTO {

    private String sweetName;
    private String sweetDescription;
    private double price;
    private int quantity;

    @Enumerated(EnumType.STRING)
    private SweetCategory sweetCategory;
}
