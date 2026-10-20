package com.dh.Proyecto.Final_BackEnd.mapper;

import com.dh.Proyecto.Final_BackEnd.entity.Room;
import com.dh.Proyecto.Final_BackEnd.entity.dto.ProductDisplayDto;
import com.dh.Proyecto.Final_BackEnd.service.impl.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class RoomMapper {

    private final ImageService imageService;
    private final CategoryMapper categoryMapper;
    private final CharacteristicMapper characteristicMapper;

    public ProductDisplayDto mapRoomToRoomDisplayDto(Room room) {
        ProductDisplayDto productDisplayDto = new ProductDisplayDto();

        productDisplayDto.setId(room.getId());
        productDisplayDto.setName(room.getName());
        productDisplayDto.setDescription(room.getDescription());
        productDisplayDto.setType("ROOM");
        productDisplayDto.setCharacteristicResponseDtos(characteristicMapper.characteristicToResponseDtoList(room.getCharacteristics()));

        List<String> imageUrls = imageService.findImageUrlsRoom(room);
        productDisplayDto.setImagesUrl(imageUrls);

        if (room.getCategory() != null){
            productDisplayDto.setCategoryResponseDto(categoryMapper.mapCategoryToCategoryResponseDto(room.getCategory()));
        }

        return productDisplayDto;

    }


}
