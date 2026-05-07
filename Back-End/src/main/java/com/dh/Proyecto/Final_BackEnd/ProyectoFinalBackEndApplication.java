package com.dh.Proyecto.Final_BackEnd;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Base64;

@SpringBootApplication
public class ProyectoFinalBackEndApplication {

	public static void main(String[] args) {

		SpringApplication.run(ProyectoFinalBackEndApplication.class, args);
	}

}
