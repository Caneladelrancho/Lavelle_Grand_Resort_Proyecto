package com.dh.Proyecto.Final_BackEnd.service;

import com.dh.Proyecto.Final_BackEnd.authentication.AuthenticationRequestDto;
import com.dh.Proyecto.Final_BackEnd.authentication.AuthenticationResponseDto;
import com.dh.Proyecto.Final_BackEnd.authentication.RegisterRequestDto;


public interface IUserService {

    AuthenticationResponseDto registerUser(RegisterRequestDto request);
    AuthenticationResponseDto registerAdmin(RegisterRequestDto request);
    AuthenticationResponseDto login(AuthenticationRequestDto request);

}
