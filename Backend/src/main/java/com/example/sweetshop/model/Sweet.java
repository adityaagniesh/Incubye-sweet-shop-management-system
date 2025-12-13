package com.example.sweetshop.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Sweet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sweetId;

    private String sweetName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private SweetCategory sweetcategory;

    private String description;
    private double price;
    private int quantity;

    public void setName(String gulabJamun) {
    }
}
