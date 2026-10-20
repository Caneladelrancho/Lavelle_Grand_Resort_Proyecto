package com.dh.Proyecto.Final_BackEnd.entity.dto;


import com.dh.Proyecto.Final_BackEnd.entity.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryResponseDto {

    private Long id;
    private String title;
    private String description;
    private CategoryType categoryType;

    @Override
    public String toString() {
        return "CategoryResponseDto{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", categoryType=" + categoryType +
                '}';
    }
}
