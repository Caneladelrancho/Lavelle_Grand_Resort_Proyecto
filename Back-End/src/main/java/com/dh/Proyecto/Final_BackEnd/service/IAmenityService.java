package com.dh.Proyecto.Final_BackEnd.service;

import com.dh.Proyecto.Final_BackEnd.model.Amenity;
import com.dh.Proyecto.Final_BackEnd.model.dto.AdminProductDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.AmenityResponseDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.ProductDisplayDto;

import java.io.IOException;
import java.util.List;

public interface IAmenityService {

    AmenityResponseDto saveAmenity(AdminProductDto adminProductDto) throws IOException;
    List<ProductDisplayDto> displayAmenities() throws IOException;
    List<ProductDisplayDto> findAllAmenities() throws Exception;
    void deleteAmenity(Long id) throws Exception;

}
