package com.dh.Proyecto.Final_BackEnd.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AmenityResponseDto {

    private Long Id;
    private String name;
    private String description;
    private Boolean needsReservation;
}
