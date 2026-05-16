package com.dh.Proyecto.Final_BackEnd.Controller;

import com.dh.Proyecto.Final_BackEnd.model.Amenity;
import com.dh.Proyecto.Final_BackEnd.model.dto.AdminProductDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.ProductDisplayDto;
import com.dh.Proyecto.Final_BackEnd.service.IAmenityService;
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
    public ResponseEntity<?> save(@ModelAttribute AdminProductDto adminProductDto){
        try{
            Amenity savedAmenity = iAmenityService.saveAmenity(adminProductDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAmenity);

        } catch (IllegalArgumentException e) {
            // Error 400 - El usuario hizo algo mal (nombre duplicado)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());

        }catch (IOException e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error saving room: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> displayAmenitiesForUser(){
        try{
            List<ProductDisplayDto> amenities = iAmenityService.displayAmenities();
            return ResponseEntity.ok(amenities);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving amenities: " + e.getMessage());
        }
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getAllAmenities(){
        try {
            List<ProductDisplayDto> rooms = iAmenityService.findAllAmenities();
            return ResponseEntity.ok(rooms);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());

        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAmenity(@PathVariable Long id){
        try {
            iAmenityService.deleteAmenity(id);
            return ResponseEntity.ok("Amenity with ID " + id + " successfully deleted.");

        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting amenity: " + e.getMessage());
        }
    }
}
