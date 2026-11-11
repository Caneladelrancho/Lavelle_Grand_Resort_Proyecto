package com.dh.Proyecto.Final_BackEnd.service;


import com.dh.Proyecto.Final_BackEnd.entity.dto.CharacteristicRequestDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.CharacteristicResponseDto;

import java.io.IOException;
import java.util.List;

public interface ICharacteristicService {

    CharacteristicResponseDto createCharacteristic(CharacteristicRequestDto characteristicRequestDto);
    List<CharacteristicResponseDto> findAllCharacteristics();
    void deleteCharacteristic(Long id) throws Exception;
    CharacteristicResponseDto updateCharacteristic(Long id, CharacteristicRequestDto characteristicRequestDto);
}
