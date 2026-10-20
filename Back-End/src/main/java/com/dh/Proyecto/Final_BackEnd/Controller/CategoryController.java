package com.dh.Proyecto.Final_BackEnd.Controller;

import com.dh.Proyecto.Final_BackEnd.entity.dto.CategoryRequestDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.CategoryResponseDto;
import com.dh.Proyecto.Final_BackEnd.service.ICategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final ICategoryService iCategoryService;

    @PostMapping("/add")
    public ResponseEntity<CategoryResponseDto> save(@Valid @RequestBody CategoryRequestDto categoryRequestDto) throws IOException{
        CategoryResponseDto savedCategory = iCategoryService.addCategory(categoryRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCategory);
    }

    @GetMapping
    public ResponseEntity<List<CategoryResponseDto>> getAllCategories() throws Exception{
        List<CategoryResponseDto> categories = iCategoryService.findAllCategories();
        return ResponseEntity.ok(categories);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) throws Exception {
        iCategoryService.deleteCategory(id);
        return ResponseEntity.ok("Categoria con ID " + id + " eliminada exitosamente");
    }
}
