package com.example.sweetshop.payload;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestockRequestDTO {
    @Positive(message = "Restock quantity must be greater than zero")
    private int quantity;
}
