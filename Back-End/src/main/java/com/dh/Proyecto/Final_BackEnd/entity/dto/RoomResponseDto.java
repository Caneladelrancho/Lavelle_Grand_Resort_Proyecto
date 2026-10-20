package com.dh.Proyecto.Final_BackEnd.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponseDto {

    private Long id;
    private String name;
    private String description;
    private CategoryResponseDto categoryResponseDto;
    private List<CharacteristicResponseDto> characteristics;


}
