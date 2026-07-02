package com.dh.Proyecto.Final_BackEnd.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDisplayDto {

    private Long Id;
    private String name;
    private String description;
    private List<String> imagesUrl;
    private String type;


    @Override
    public String toString() {
        return "ProductDisplayDto{" +
                "Id=" + Id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", imagesUrl=" + imagesUrl +
                ", type='" + type + '\'' +
                '}';
    }
}


