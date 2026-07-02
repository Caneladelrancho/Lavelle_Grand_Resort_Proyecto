package com.dh.Proyecto.Final_BackEnd.authentication;


import com.dh.Proyecto.Final_BackEnd.model.Role;
import com.dh.Proyecto.Final_BackEnd.model.dto.AuthenticationResponseDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.RegisterRequestDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.UserResponseDto;
import com.dh.Proyecto.Final_BackEnd.service.impl.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AuthenticationControllerAdmin {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDto> registerAdmin(
           @Valid @RequestBody RegisterRequestDto request){
        return ResponseEntity.ok(userService.registerAdmin(request));
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<UserResponseDto> updateRole(
            @PathVariable Long id,
            @RequestBody Map<String, String> body) {
        Role newRole = Role.valueOf(body.get("role"));
        return ResponseEntity.ok(userService.updateRole(id, newRole));
    }

}
