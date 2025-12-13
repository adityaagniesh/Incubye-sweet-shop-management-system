package com.example.sweetshop.Controller;

import com.example.sweetshop.model.SweetCategory;
import com.example.sweetshop.payload.SweetRequestDTO;
import com.example.sweetshop.payload.SweetResponseDTO;
import com.example.sweetshop.service.SweetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.example.sweetshop.exceptions.ResourceNotFoundException;

import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;


@WebMvcTest(SweetController.class)
class SweetControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;


    @MockitoBean
    private SweetService sweetService;

    @Test
    void shouldReturn201WhenSweetIsCreated() throws Exception {
        when(sweetService.createSweet(any()))
                .thenReturn(new SweetRequestDTO());

        String request = """
            {
              "sweetName": "Rasgulla",
              "sweetCategory": "INDIAN",
              "price": 200,
              "quantity": 5
            }
        """;

        mockMvc.perform(post("/api/sweets")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(request))
                .andExpect(status().isCreated());
    }

    @Test
    void updateSweet_shouldReturn200_whenSweetUpdatedSuccessfully() throws Exception {

        Long sweetId = 1L;

        SweetRequestDTO requestDTO = new SweetRequestDTO();
        requestDTO.setSweetName("Kaju Katli");
        requestDTO.setPrice(30);
        requestDTO.setQuantity(10);
        requestDTO.setSweetCategory(SweetCategory.DRY_FRUIT);

        SweetResponseDTO responseDTO = new SweetResponseDTO();
        responseDTO.setSweetName("Kaju Katli");
        responseDTO.setPrice(30);
        responseDTO.setQuantity(10);
        responseDTO.setSweetCategory(SweetCategory.DRY_FRUIT);

        when(sweetService.updateSweet(eq(sweetId), any(SweetRequestDTO.class)))
                .thenReturn(responseDTO);

        mockMvc.perform(
                        put("/api/sweets/{sweetId}", sweetId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(requestDTO))
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.sweetName").value("Kaju Katli"))
                .andExpect(jsonPath("$.sweetCategory").value("DRY_FRUIT"));
    }

    @Test
    void updateSweet_shouldReturn404_whenSweetNotFound() throws Exception {

        Long sweetId = 99L;

        SweetRequestDTO requestDTO = new SweetRequestDTO();
        requestDTO.setSweetName("Rasgulla");
        requestDTO.setPrice(20);
        requestDTO.setQuantity(5);
        requestDTO.setSweetCategory(SweetCategory.DRY_FRUIT);

        when(sweetService.updateSweet(eq(sweetId), any(SweetRequestDTO.class)))
                .thenThrow(new ResourceNotFoundException("Sweet not found"));

        mockMvc.perform(
                        put("/api/sweets/{sweetId}", sweetId)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(requestDTO))
                )
                .andExpect(status().isNotFound());
    }
}

