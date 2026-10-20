package com.dh.Proyecto.Final_BackEnd.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CharacteristicResponseDto {

    private Long id;
    private String name;
    private String icon;
}
