package com.dh.Proyecto.Final_BackEnd.model.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponseDto {

    private Long id;
    private String title;
    private String imageUrl;
    private String description;

    @Override
    public String toString() {
        return "CategoryResponseDto{" +
                "Id=" + id +
                ", title='" + title + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
