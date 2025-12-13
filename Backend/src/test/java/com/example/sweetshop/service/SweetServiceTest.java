package com.example.sweetshop.service;

import com.example.sweetshop.payload.SweetResponseDTO;
import com.example.sweetshop.model.SweetCategory;
import com.example.sweetshop.model.Sweet;
import com.example.sweetshop.repository.SweetRepository;
import com.example.sweetshop.service.SweetServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.modelmapper.ModelMapper;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SweetServiceImplTest {

    @Mock
    private SweetRepository sweetRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private SweetServiceImpl sweetService;

    @Test
    void shouldReturnListOfSweetResponseDTO() {

        // Arrange
        Sweet sweet1 = new Sweet();
        sweet1.setSweetName("Gulab Jamun");
        sweet1.setPrice(15);
        sweet1.setQuantity(10);
        sweet1.setSweetcategory(SweetCategory.CHOCOLATE);

        Sweet sweet2 = new Sweet();
        sweet2.setSweetName("Kaju Katli");
        sweet2.setPrice(25);
        sweet2.setQuantity(5);
        sweet2.setSweetcategory(SweetCategory.DRY_FRUIT);

        when(sweetRepository.findAll()).thenReturn(List.of(sweet1, sweet2));

        when(modelMapper.map(any(Sweet.class), eq(SweetResponseDTO.class)))
                .thenAnswer(invocation -> {
                    Sweet s = invocation.getArgument(0);
                    SweetResponseDTO dto = new SweetResponseDTO();
                    dto.setSweetName(s.getSweetName());
                    dto.setPrice(s.getPrice());
                    dto.setQuantity(s.getQuantity());
                    dto.setSweetCategory(s.getSweetcategory());
                    return dto;
                });

        // Act
        List<SweetResponseDTO> result = sweetService.getAllSweets();

        // Assert
        assertEquals(2, result.size());
        assertEquals("Gulab Jamun", result.get(0).getSweetName());
        assertEquals(SweetCategory.CHOCOLATE, result.get(0).getSweetCategory());
    }
}

