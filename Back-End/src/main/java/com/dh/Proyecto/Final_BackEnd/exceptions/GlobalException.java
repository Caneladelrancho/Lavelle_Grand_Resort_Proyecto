package com.dh.Proyecto.Final_BackEnd.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@ControllerAdvice
public class GlobalException {

    //Cuando algo no se encuentra 404
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotfound(ResourceNotFoundException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    //Cuando hay algo que ya existe 409
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<String> handleDuplicateResource(DuplicateResourceException e){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    //Cualquier otro error inesperado 500
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGenericException(Exception e){
        log.error("Error inesperado", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Ocurrió un error inesperado. Por favor intenta nuevamente.");
    }

    //Cuando los campos del request no pasan las validaciones, devuelve un error 400 con un mensaje claro por cada campo invalido
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException e) {
        Map<String, String> errors = new LinkedHashMap<>();

        e.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );
        return ResponseEntity.badRequest().body(errors);
    }

    //Codigo 401
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<String> handleBadCredentials(BadCredentialsException e){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Email o contraseña incorrectos");
    }

    //Codigo 409
    @ExceptionHandler(ResourceConflictException.class)
    public ResponseEntity<String> handleResourceConflict(ResourceConflictException e){
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

    //Codigo 400, cuando el cuerpo de la peticion esta vacio, falta algo o el json esta mal construido
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<String> handleInvalidBodyErrors(HttpMessageNotReadableException e){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El cuerpo de la petición es inválido o está vacío.");
    }
}
