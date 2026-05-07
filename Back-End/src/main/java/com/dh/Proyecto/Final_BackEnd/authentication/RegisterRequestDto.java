package com.dh.Proyecto.Final_BackEnd.authentication;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequestDto {

    public String name;
    public String lastName;
    public String email;
    public String password;
}
