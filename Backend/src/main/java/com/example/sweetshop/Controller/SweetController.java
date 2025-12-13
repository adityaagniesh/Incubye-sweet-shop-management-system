package com.example.sweetshop.Controller;

import com.example.sweetshop.payload.SweetRequestDTO;
import com.example.sweetshop.service.SweetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
