package com.dh.Proyecto.Final_BackEnd.mapper;

import com.dh.Proyecto.Final_BackEnd.entity.Amenity;
import com.dh.Proyecto.Final_BackEnd.entity.dto.ProductDisplayDto;
import com.dh.Proyecto.Final_BackEnd.service.impl.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AmenityMapper {

    private final ImageService imageService;
    private final CategoryMapper categoryMapper;

    public ProductDisplayDto mapAmenityToAmenityDisplayDto(Amenity amenity){
        ProductDisplayDto productDisplayDto = new ProductDisplayDto();

        productDisplayDto.setId(amenity.getId());
        productDisplayDto.setName(amenity.getName());
        productDisplayDto.setDescription(amenity.getDescription());
        productDisplayDto.setType("AMENITY");

        List<String> imageUrls = imageService.findImageUrlsAmenity(amenity);
        productDisplayDto.setImagesUrl(imageUrls);

        if (amenity.getCategory() != null){
            productDisplayDto.setCategoryResponseDto(categoryMapper.mapCategoryToCategoryResponseDto(amenity.getCategory()));

        }

        return productDisplayDto;

    }
}
