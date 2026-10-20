package com.dh.Proyecto.Final_BackEnd.service;

import com.dh.Proyecto.Final_BackEnd.entity.dto.AdminProductDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.AmenityResponseDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.ProductDisplayDto;

import java.io.IOException;
import java.util.List;

public interface IAmenityService {

    AmenityResponseDto saveAmenity(AdminProductDto adminProductDto) throws IOException;
    List<ProductDisplayDto> displayAmenities() throws IOException;
    List<ProductDisplayDto> findAllAmenities() throws Exception;
    void deleteAmenity(Long id) throws Exception;
    AmenityResponseDto updateAmenity(Long id, AdminProductDto adminProductDto) throws IOException;

}
