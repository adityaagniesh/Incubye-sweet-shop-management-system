package com.example.sweetshop.Controller;

import com.example.sweetshop.model.SweetCategory;
import com.example.sweetshop.payload.SweetRequestDTO;
import com.example.sweetshop.payload.SweetResponseDTO;
import com.example.sweetshop.service.SweetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sweets")
public class SweetController {

    @Autowired
    private SweetService sweetService;

    @PostMapping
    public ResponseEntity<SweetRequestDTO> addSweet(
            @Valid  @RequestBody SweetRequestDTO sweetRequestDTO) {
        SweetRequestDTO savedSweetRequestDTO = sweetService.createSweet(sweetRequestDTO);
        return new ResponseEntity<>(savedSweetRequestDTO, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<SweetResponseDTO>> getAllSweets() {
        return ResponseEntity.ok(sweetService.getAllSweets());
    }

    @GetMapping("/search")
    public ResponseEntity<List<SweetResponseDTO>> searchSweets(
            @RequestParam(required = false) String sweetName,
            @RequestParam(required = false) SweetCategory sweetCategory,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
            ) {
        return ResponseEntity.ok(
                sweetService.searchSweets(sweetName, sweetCategory, minPrice, maxPrice)
        );
    }


}
