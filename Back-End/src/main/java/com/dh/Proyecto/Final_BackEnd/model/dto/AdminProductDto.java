package com.dh.Proyecto.Final_BackEnd.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminProductDto {

    @NotBlank(message = "El nombre es obligatorio.")
    @Size(min = 3, message = "El nombre debe tener al menos 3 caracteres.")
    private String name;

    @NotBlank(message = "La descripción es obligatoria.")
    @Size(min = 10, message = "La descripción debe tener al menos 10 caracteres.")
    private String description;
    private Boolean needsReservation;
    private List<MultipartFile> images;


    @Override
    public String toString() {
        return "AdminProductDto{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", needsReservation=" + needsReservation +
                ", images=" + images +
                '}';
    }
}
