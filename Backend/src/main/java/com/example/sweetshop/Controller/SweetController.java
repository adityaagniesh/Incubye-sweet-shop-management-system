package com.example.sweetshop.Controller;

import com.example.sweetshop.model.SweetCategory;
import com.example.sweetshop.payload.PurchaseRequestDTO;
import com.example.sweetshop.payload.PurchaseResponseDTO;
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

        List<SweetResponseDTO> sweets=sweetService.getAllSweets();

        if(sweets.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(sweets);
    }

    @GetMapping("/search")
    public ResponseEntity<List<SweetResponseDTO>> searchSweets(
            @RequestParam(required = false) String sweetName,
            @RequestParam(required = false) SweetCategory sweetCategory,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice
            ) {

        List<SweetResponseDTO> sweets =
                sweetService.searchSweets(sweetName, sweetCategory, minPrice, maxPrice);

        if (sweets.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(sweets);
    }

    @PutMapping("/{sweetId}")
    public ResponseEntity<SweetResponseDTO> updateSweet(
            @PathVariable Long sweetId,
            @Valid @RequestBody SweetRequestDTO requestDTO
    ) {
        SweetResponseDTO response = sweetService.updateSweet(sweetId, requestDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{sweetId}")
    public ResponseEntity<Void> deleteSweet(
            @PathVariable("sweetId") Long sweetId
    ) {
        sweetService.deleteSweet(sweetId);
        return ResponseEntity.noContent().build(); // 204
    }

    @PostMapping("/{sweetId}/purchase")
    public ResponseEntity<PurchaseResponseDTO> purchaseSweet(
            @PathVariable("sweetId") Long sweetId,
            @Valid @RequestBody PurchaseRequestDTO requestDTO
    ) {
        PurchaseResponseDTO response =
                sweetService.purchaseSweet(sweetId, requestDTO);

        return ResponseEntity.ok(response);
    }

}
