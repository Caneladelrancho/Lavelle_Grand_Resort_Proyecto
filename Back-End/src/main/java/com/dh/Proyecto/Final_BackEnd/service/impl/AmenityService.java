package com.dh.Proyecto.Final_BackEnd.service.impl;

import com.dh.Proyecto.Final_BackEnd.model.Amenity;
import com.dh.Proyecto.Final_BackEnd.model.dto.AdminProductDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.ProductDisplayDto;
import com.dh.Proyecto.Final_BackEnd.repository.IAmenityRepository;
import com.dh.Proyecto.Final_BackEnd.service.IAmenityService;
import com.dh.Proyecto.Final_BackEnd.service.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AmenityService implements IAmenityService {

    @Autowired
    private IAmenityRepository amenityRepository;
    @Autowired
    private IImageService imageService;

    @Override
    public Amenity saveAmenity(AdminProductDto adminProductDto) throws IOException {

        try {
            Amenity amenity = new Amenity();
            amenity.setName(adminProductDto.getName());
            amenity.setDescription(adminProductDto.getDescription());
            amenity.setNeedsReservation(adminProductDto.getNeedsReservation());

            Amenity savedAmenity = amenityRepository.save(amenity);

            if (adminProductDto.getImages() != null && !adminProductDto.getImages().isEmpty()){
                for (MultipartFile imageFile : adminProductDto.getImages()){
                    imageService.saveImageAmenity(imageFile, savedAmenity);
                }
            }
            return savedAmenity;


        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new RuntimeException(e);

        }
    }

    //MOSTRAR AMENITIES AL USUARIO
    @Override
    public List<ProductDisplayDto> displayAmenities() throws IOException {

        try{
            List<Amenity> amenities = amenityRepository.findAll();

            if (amenities.isEmpty()){
                return new ArrayList<>();
            }

            List<ProductDisplayDto> displayDtos = new ArrayList<>();

            for (Amenity amenity : amenities){
                ProductDisplayDto displayDto = new ProductDisplayDto();
                displayDto.setId(amenity.getId());
                displayDto.setName(amenity.getName());
                displayDto.setDescription(amenity.getDescription());
                displayDto.setType("AMENITY");

                List<String> imageUrls = imageService.findImageUrlsAmenity(amenity);
                displayDto.setImagesUrl(imageUrls);

                displayDtos.add(displayDto);
            }
            return displayDtos;

        }catch (Exception e){
            throw new IOException("Unable to retrieve amenities for display: " + e.getMessage());

        }
    }

    //ENCONTRAR TODOS LOS AMENITIES PARA EL ADMIN
    @Override
    public List<ProductDisplayDto> findAllAmenities() throws Exception {
        try{
            List<Amenity> amenities = amenityRepository.findAll();

            if (amenities.isEmpty()){
                return new ArrayList<>();
            }

            List<ProductDisplayDto> productDisplayDtos = new ArrayList<>();

            for (Amenity amenity : amenities){
                ProductDisplayDto productDisplayDto = new ProductDisplayDto();
                        productDisplayDto.setId(amenity.getId());
                        productDisplayDto.setName(amenity.getName());

                        productDisplayDtos.add(productDisplayDto);
            }
            return productDisplayDtos;

        }catch (Exception e){
            throw new Exception("Unable to retreive amenities for admin: " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteAmenity(Long id) throws Exception {
        try {
            Amenity amenity = amenityRepository.findById(id)
                    .orElseThrow(() -> new Exception("Amenity not found with id: " + id));

            imageService.deleteImagesAmenity(id);
            amenityRepository.delete(amenity);


        }catch (Exception e){
            throw new Exception("Unable to delete amenity: " + e.getMessage(), e);

        }
    }
}
