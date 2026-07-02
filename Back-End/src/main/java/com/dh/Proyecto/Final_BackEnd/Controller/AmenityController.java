package com.dh.Proyecto.Final_BackEnd.Controller;

import com.dh.Proyecto.Final_BackEnd.model.Amenity;
import com.dh.Proyecto.Final_BackEnd.model.dto.AdminProductDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.AmenityResponseDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.ProductDisplayDto;
import com.dh.Proyecto.Final_BackEnd.service.IAmenityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/amenities")
public class AmenityController {

   private IAmenityService iAmenityService;

    @Autowired
    public AmenityController(IAmenityService iAmenityService) {
        this.iAmenityService = iAmenityService;
    }

    @PostMapping("/add")
    public ResponseEntity<AmenityResponseDto> save(@Valid @ModelAttribute AdminProductDto adminProductDto) throws IOException{
        AmenityResponseDto savedAmenity = iAmenityService.saveAmenity(adminProductDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAmenity);
    }

    @GetMapping
   public ResponseEntity<List<ProductDisplayDto>> displayAmenitiesForUser() throws IOException{
        List<ProductDisplayDto> amenities = iAmenityService.displayAmenities();
        return ResponseEntity.ok(amenities);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<ProductDisplayDto>> getAllAmenities() throws Exception{
        List<ProductDisplayDto> amenities = iAmenityService.findAllAmenities();
        return ResponseEntity.ok(amenities);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAmenity(@PathVariable Long id) throws Exception{
        iAmenityService.deleteAmenity(id);
        return ResponseEntity.ok("Amenidad con ID " + id + " eliminada exitosamente");
    }
}
