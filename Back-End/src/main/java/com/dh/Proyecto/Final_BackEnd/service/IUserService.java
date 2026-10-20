package com.dh.Proyecto.Final_BackEnd.service;

import com.dh.Proyecto.Final_BackEnd.entity.Role;
import com.dh.Proyecto.Final_BackEnd.entity.dto.AuthenticationResponseDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.AuthenticationRequestDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.RegisterRequestDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.UserResponseDto;

import java.util.List;


public interface IUserService {

    AuthenticationResponseDto registerUser(RegisterRequestDto request);
    AuthenticationResponseDto registerAdmin(RegisterRequestDto request);
    AuthenticationResponseDto login(AuthenticationRequestDto request);
    List<UserResponseDto> getAllUsers();
    UserResponseDto updateRole(Long userId, Role newRole);
}
