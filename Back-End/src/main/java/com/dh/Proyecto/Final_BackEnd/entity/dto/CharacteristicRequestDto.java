package com.dh.Proyecto.Final_BackEnd.entity.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class CharacteristicRequestDto {

    @NotBlank(message = "El nombre es obligatorio.")
    @Size(min = 3, message = "El nombre debe tener al menos 3 caracteres.")
    private String name;

    private String icon;
}
