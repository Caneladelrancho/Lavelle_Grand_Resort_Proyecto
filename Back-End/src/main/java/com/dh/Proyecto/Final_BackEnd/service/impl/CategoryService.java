package com.dh.Proyecto.Final_BackEnd.service.impl;

import com.dh.Proyecto.Final_BackEnd.exceptions.DuplicateResourceException;
import com.dh.Proyecto.Final_BackEnd.exceptions.ResourceConflictException;
import com.dh.Proyecto.Final_BackEnd.exceptions.ResourceNotFoundException;
import com.dh.Proyecto.Final_BackEnd.entity.Category;
import com.dh.Proyecto.Final_BackEnd.entity.dto.CategoryRequestDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.CategoryResponseDto;
import com.dh.Proyecto.Final_BackEnd.repository.ICategoryRepository;
import com.dh.Proyecto.Final_BackEnd.repository.IRoomRepository;
import com.dh.Proyecto.Final_BackEnd.service.ICategoryService;
import com.dh.Proyecto.Final_BackEnd.service.IImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {

    private final ICategoryRepository categoryRepository;
    private final IRoomRepository roomRepository;


    //GUARDAR O CREAR CATEGORIA
    @Override
    public CategoryResponseDto addCategory(CategoryRequestDto categoryRequestDto) throws IOException {

        //Validar duplicados
        Optional<Category> existingCategory = categoryRepository.findByTitle(categoryRequestDto.getTitle());
        if (existingCategory.isPresent()){
            throw new DuplicateResourceException("Ya existe una categoria con el titulo: " + categoryRequestDto.getTitle());
        }

        try{
            //Construir objeto category
            Category category = new Category();
            category.setTitle(categoryRequestDto.getTitle());
            category.setDescription(categoryRequestDto.getDescription());
            category.setCategoryType(categoryRequestDto.getCategoryType());

            //Guardar el objeto category
            Category savedCategory = categoryRepository.save(category);

            return new CategoryResponseDto(
                    savedCategory.getId(),
                    savedCategory.getTitle(),
                    savedCategory.getDescription(),
                    savedCategory.getCategoryType()
            );


        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<CategoryResponseDto> findAllCategories() throws Exception {
        try{
            List<Category> categories = categoryRepository.findAll();

            if (categories.isEmpty()){
                return new ArrayList<>();
            }

            List<CategoryResponseDto> categoryResponseDtos = new ArrayList<>();

            for (Category category : categories){
                CategoryResponseDto categoryResponseDto = new CategoryResponseDto();
                    categoryResponseDto.setId(category.getId());
                    categoryResponseDto.setTitle(category.getTitle());
                    categoryResponseDto.setDescription(category.getDescription());
                    categoryResponseDto.setCategoryType(category.getCategoryType());

                    categoryResponseDtos.add(categoryResponseDto);
            }
            return categoryResponseDtos;

        }catch (Exception e){
            throw new Exception("Unable to retrieve categories: " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteCategory(Long id) throws Exception {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));

        if (roomRepository.existsByCategoryId(id)){
            throw new ResourceConflictException("The category cannot be deleted since it has associated rooms");
        }
        categoryRepository.delete(category);
    }
}
