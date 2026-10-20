package com.dh.Proyecto.Final_BackEnd.mapper;

import com.dh.Proyecto.Final_BackEnd.entity.Characteristic;
import com.dh.Proyecto.Final_BackEnd.entity.dto.CharacteristicResponseDto;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class CharacteristicMapper {


    //Convertir Characteristic a characteristicResponseDTO para un SOLO elemento
    public CharacteristicResponseDto mapCharacteristicToCharacteristicResponseDto(Characteristic characteristic){
        CharacteristicResponseDto characteristicResponseDto = new CharacteristicResponseDto();

        characteristicResponseDto.setId(characteristic.getId());
        characteristicResponseDto.setName(characteristic.getName());
        characteristicResponseDto.setIcon(characteristic.getIcon());

        return characteristicResponseDto;
    }

    //Convertir Characteristic a characteristicResponseDTO para UNA LISTA completa
    public List<CharacteristicResponseDto> characteristicToResponseDtoList(List<Characteristic> characteristics){
        List<CharacteristicResponseDto> characteristicResponseDtos = new ArrayList<>();
        for (Characteristic characteristic : characteristics){
            characteristicResponseDtos.add(mapCharacteristicToCharacteristicResponseDto(characteristic));
        }
        return characteristicResponseDtos;
    }
}
