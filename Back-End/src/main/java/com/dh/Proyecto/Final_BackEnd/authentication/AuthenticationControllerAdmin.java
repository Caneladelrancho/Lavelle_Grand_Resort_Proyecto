package com.dh.Proyecto.Final_BackEnd.authentication;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AuthenticationControllerAdmin {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponseDto> registerAdmin(
            @RequestBody RegisterRequestDto request){
        return ResponseEntity.ok(userService.registerAdmin(request));
    }

}
