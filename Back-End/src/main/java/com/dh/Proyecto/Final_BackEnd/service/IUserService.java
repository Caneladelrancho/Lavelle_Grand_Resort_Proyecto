package com.dh.Proyecto.Final_BackEnd.service;

import com.dh.Proyecto.Final_BackEnd.model.Role;
import com.dh.Proyecto.Final_BackEnd.model.dto.AuthenticationResponseDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.AuthenticationRequestDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.RegisterRequestDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.UserResponseDto;

import java.util.List;


public interface IUserService {

    AuthenticationResponseDto registerUser(RegisterRequestDto request);
    AuthenticationResponseDto registerAdmin(RegisterRequestDto request);
    AuthenticationResponseDto login(AuthenticationRequestDto request);
    List<UserResponseDto> getAllUsers();
    UserResponseDto updateRole(Long userId, Role newRole);
}
