package com.dh.Proyecto.Final_BackEnd.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDisplayDto {

    private Long id;
    private String name;
    private String description;
    private List<String> imagesUrl;
    private String type;
    private CategoryResponseDto categoryResponseDto;
    private List<CharacteristicResponseDto> characteristicResponseDtos;
    private Boolean needsReservation;


    @Override
    public String toString() {
        return "ProductDisplayDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", imagesUrl=" + imagesUrl +
                ", type='" + type + '\'' +
                ", categoryResponseDto=" + categoryResponseDto +
                ", characteristicResponseDtos=" + characteristicResponseDtos +
                ", needsReservation=" + needsReservation +
                '}';
    }
}


