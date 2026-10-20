package com.dh.Proyecto.Final_BackEnd.mapper;

import com.dh.Proyecto.Final_BackEnd.entity.Category;
import com.dh.Proyecto.Final_BackEnd.entity.dto.CategoryResponseDto;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    //Convertir category a categoryResponseDto para un solo elemento
    public CategoryResponseDto mapCategoryToCategoryResponseDto(Category category) {
        CategoryResponseDto categoryResponseDto = new CategoryResponseDto();

        categoryResponseDto.setId(category.getId());
        categoryResponseDto.setTitle(category.getTitle());
        categoryResponseDto.setDescription(category.getDescription());
        categoryResponseDto.setCategoryType(category.getCategoryType());

        return categoryResponseDto;
    }
}
