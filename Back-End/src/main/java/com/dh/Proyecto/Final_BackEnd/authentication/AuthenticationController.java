package com.dh.Proyecto.Final_BackEnd.authentication;

import com.dh.Proyecto.Final_BackEnd.model.dto.AuthenticationRequestDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.AuthenticationResponseDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.RegisterRequestDto;
import com.dh.Proyecto.Final_BackEnd.service.impl.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDto> register(
           @Valid @RequestBody RegisterRequestDto request){
        return ResponseEntity.ok(userService.registerUser(request));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponseDto> login(
           @Valid @RequestBody AuthenticationRequestDto request
    ){
        return ResponseEntity.ok(userService.login(request));
    }

}
