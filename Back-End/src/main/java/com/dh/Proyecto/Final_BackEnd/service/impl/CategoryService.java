package com.dh.Proyecto.Final_BackEnd.service.impl;

import com.dh.Proyecto.Final_BackEnd.exceptions.DuplicateResourceException;
import com.dh.Proyecto.Final_BackEnd.exceptions.ResourceNotFoundException;
import com.dh.Proyecto.Final_BackEnd.model.Category;
import com.dh.Proyecto.Final_BackEnd.model.dto.CategoryRequestDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.CategoryResponseDto;
import com.dh.Proyecto.Final_BackEnd.repository.ICategoryRepository;
import com.dh.Proyecto.Final_BackEnd.service.ICategoryService;
import com.dh.Proyecto.Final_BackEnd.service.IImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService implements ICategoryService {

    private final ICategoryRepository categoryRepository;
    private final IImageService imageService;


    //GUARDAR O CREAR CATEGORIA
    @Override
    public CategoryResponseDto addCategory(CategoryRequestDto categoryRequestDto) throws IOException {

        //Validar duplicados
        Optional<Category> existingCategory = categoryRepository.findByTitle(categoryRequestDto.getTitle());
        if (existingCategory.isPresent()){
            throw new DuplicateResourceException("Ya existe una categoria con el titulo: " + categoryRequestDto.getTitle());
        }

        try{

            //Procesar imagen
            String imagePath = imageService.processAndSaveFile(categoryRequestDto.getImage());

            //Construir objeto category
            Category category = new Category();
            category.setTitle(categoryRequestDto.getTitle());
            category.setDescription(categoryRequestDto.getDescription());
            category.setImage(imagePath);

            //Guardar el objeto category
            Category savedCategory = categoryRepository.save(category);

            return new CategoryResponseDto(
                    savedCategory.getId(),
                    savedCategory.getTitle(),
                    savedCategory.getDescription(),
                    savedCategory.getImage()
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
                    categoryResponseDto.setImageUrl(category.getImage());

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

        if (category.getImage() != null){
            imageService.deletePhysicalFile(category.getImage());
        }
        categoryRepository.deleteById(id);
    }
}
