package com.example.sweetshop.payload;

import com.example.sweetshop.model.SweetCategory;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SweetRequestDTO {

    @NotBlank
    private String sweetName;

    @NotNull
    private SweetCategory sweetCategory;

    private String description;

    @Positive
    private double price;

    @PositiveOrZero
    private int quantity;
}
