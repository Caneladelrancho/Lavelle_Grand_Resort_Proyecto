package com.dh.Proyecto.Final_BackEnd.service;

import com.dh.Proyecto.Final_BackEnd.model.dto.CategoryRequestDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.CategoryResponseDto;

import java.io.IOException;
import java.util.List;

public interface ICategoryService {

    CategoryResponseDto addCategory(CategoryRequestDto categoryRequestDto) throws IOException;
    List<CategoryResponseDto> findAllCategories() throws Exception;
    void deleteCategory(Long id) throws Exception;

}
