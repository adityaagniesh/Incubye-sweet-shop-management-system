package com.example.sweetshop.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestockResponseDTO {
    private String message;
    private int totalQuantity;
}
