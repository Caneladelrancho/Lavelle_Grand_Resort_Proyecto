package com.dh.Proyecto.Final_BackEnd.service.impl;

import com.dh.Proyecto.Final_BackEnd.exceptions.DuplicateResourceException;
import com.dh.Proyecto.Final_BackEnd.exceptions.ResourceNotFoundException;
import com.dh.Proyecto.Final_BackEnd.entity.dto.AuthenticationResponseDto;
import com.dh.Proyecto.Final_BackEnd.configuration.JwtUtil;
import com.dh.Proyecto.Final_BackEnd.entity.Role;
import com.dh.Proyecto.Final_BackEnd.entity.User;
import com.dh.Proyecto.Final_BackEnd.entity.dto.AuthenticationRequestDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.RegisterRequestDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.UserResponseDto;
import com.dh.Proyecto.Final_BackEnd.repository.IUserRepository;
import com.dh.Proyecto.Final_BackEnd.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;


    private String normalizeEmail(String email){
        return email.trim().toLowerCase();
    }

    //Registrar usuario
    @Override
    public AuthenticationResponseDto registerUser(RegisterRequestDto request){

        String email = normalizeEmail(request.getEmail());

        if (userRepository.existsByEmail(email)){
            throw new DuplicateResourceException("El email ya está registrado: " + email);
        }

        User user = new User();
        user.setName(request.getName());
        user.setLastName(request.getLastName());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);

        userRepository.save(user);

        String token = jwtUtil.generateToken(user);
        return new AuthenticationResponseDto(token);
    }

    //Registrar admin
    @Override
    public AuthenticationResponseDto registerAdmin(RegisterRequestDto request) {

        String email = normalizeEmail(request.getEmail());

        if (userRepository.existsByEmail(email)){
            throw new DuplicateResourceException("El email ya está registrado: " + email);
        }


        User user = new User();
        user.setName(request.getName());
        user.setLastName(request.getLastName());
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.ADMIN);

        userRepository.save(user);

        String token = jwtUtil.generateToken(user);
        return new AuthenticationResponseDto(token);
    }

    //Login
    @Override
    public AuthenticationResponseDto login(AuthenticationRequestDto request){

        String email = normalizeEmail(request.getEmail());

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        email,
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado: " + email));

        String token = jwtUtil.generateToken(user);
        return new AuthenticationResponseDto(token);
    }

    //Listar todos los usuarios
    @Override
    public List<UserResponseDto> getAllUsers(){
        return userRepository.findAll()
                .stream()
                .map(user ->new UserResponseDto(
                        user.getId(),
                        user.getName(),
                        user.getLastName(),
                        user.getEmail(),
                        user.getRole()
                ))
                .collect(Collectors.toList());
    }

    //Cambiar rol del usuario
    @Override
    public UserResponseDto updateRole(Long userId, Role newRole){
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con ID: " + userId));

        user.setRole(newRole);
        userRepository.save(user);

        return new UserResponseDto(
                user.getId(),
                user.getName(),
                user.getLastName(),
                user.getEmail(),
                user.getRole()
        );
    }


}
