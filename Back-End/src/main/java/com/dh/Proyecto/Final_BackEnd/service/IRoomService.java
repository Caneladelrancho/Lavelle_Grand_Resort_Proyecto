package com.dh.Proyecto.Final_BackEnd.service;

import com.dh.Proyecto.Final_BackEnd.entity.dto.AdminProductDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.ProductDisplayDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.RoomResponseDto;

import java.io.IOException;
import java.util.List;

public interface IRoomService {

    RoomResponseDto saveRoom(AdminProductDto adminProductDto) throws IOException; //Agregar room
    List<ProductDisplayDto> displayRooms() throws IOException;
    List<ProductDisplayDto> findAllRooms() throws Exception;//Listar todos los rooms que ya esten registrados
    void deleteRoom(Long id) throws Exception;//Eliminar los rooms
    RoomResponseDto updateRoom(Long id, AdminProductDto adminProductDto) throws IOException;
}
