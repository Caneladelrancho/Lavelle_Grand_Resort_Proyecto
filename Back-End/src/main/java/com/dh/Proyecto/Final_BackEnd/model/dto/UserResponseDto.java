package com.dh.Proyecto.Final_BackEnd.model.dto;

import com.dh.Proyecto.Final_BackEnd.model.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//El backend devuelve los datos de usuario para el admin y que el admn pueda ver todos los usuarios

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    private Long id;
    private String name;
    private String lastName;
    private String email;
    private Role role;



}
