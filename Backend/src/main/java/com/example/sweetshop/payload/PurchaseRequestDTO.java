package com.example.sweetshop.payload;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseRequestDTO {

    @Positive(message = "Purchase quantity must be greater than zero")
    private int quantity;
}
