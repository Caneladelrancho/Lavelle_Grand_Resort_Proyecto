package com.dh.Proyecto.Final_BackEnd.authentication;

import com.dh.Proyecto.Final_BackEnd.configuration.JwtUtil;
import com.dh.Proyecto.Final_BackEnd.model.Role;
import com.dh.Proyecto.Final_BackEnd.model.User;
import com.dh.Proyecto.Final_BackEnd.repository.IUserRepository;
import com.dh.Proyecto.Final_BackEnd.service.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService implements IUserService {

    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    //Registrar usuario
    @Override
    public AuthenticationResponseDto registerUser(RegisterRequestDto request){

        try {
            User user = new User();
            user.setName(request.getName());
            user.setLastName(request.getLastName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(Role.USER);

            userRepository.save(user);

            String token = jwtUtil.generateToken(user);
            return new AuthenticationResponseDto(token);

        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new RuntimeException();
        }

    }

    //Registrar admin
    @Override
    public AuthenticationResponseDto registerAdmin(RegisterRequestDto request) {

        try {
            User user = new User();
            user.setName(request.getName());
            user.setLastName(request.getLastName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setRole(Role.ADMIN);

            userRepository.save(user);

            String token = jwtUtil.generateToken(user);
            return new AuthenticationResponseDto(token);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException();
        }
    }

    @Override
    public AuthenticationResponseDto login(AuthenticationRequestDto request){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String token = jwtUtil.generateToken(user);
        return new AuthenticationResponseDto(token);
    }

}
