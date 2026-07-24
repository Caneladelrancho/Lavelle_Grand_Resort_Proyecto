package com.dh.Proyecto.Final_BackEnd.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryRequestDto {

    @NotBlank(message = "El título es obligatorio.")
    @Size(min = 3, message = "El título debe tener al menos 3 caracteres.")
    private String title;

    @NotBlank(message = "La descripción es obligatoria.")
    @Size(min = 10, message = "La descripción debe tener al menos 10 caracteres.")
    private String description;

    @NotNull
    private MultipartFile image;

    @Override
    public String toString() {
        return "CategoryRequestDto{" +
                "title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", image=" + image +
                '}';
    }
}
