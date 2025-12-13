package com.example.sweetshop.service;

import com.example.sweetshop.exceptions.APIException;
import com.example.sweetshop.model.Sweet;
import com.example.sweetshop.payload.SweetRequestDTO;
import com.example.sweetshop.repository.SweetRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SweetServiceImpl implements SweetService {

    @Autowired
    private SweetRepository sweetRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public SweetRequestDTO createSweet(SweetRequestDTO sweetRequestDTO) {
        Sweet sweet =modelMapper.map(sweetRequestDTO, Sweet.class);
        Sweet sweetFromDb= sweetRepository.findBySweetName(sweet.getSweetName());
        if(sweetFromDb!=null){
            throw new APIException("Sweets with name"+ sweet.getSweetName()+" already exist");
        }
        Sweet savedSweet = sweetRepository.save(sweet);
        return modelMapper.map(savedSweet, SweetRequestDTO.class);
    }
}
