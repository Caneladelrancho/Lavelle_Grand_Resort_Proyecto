package com.dh.Proyecto.Final_BackEnd.service;

import com.dh.Proyecto.Final_BackEnd.model.Room;
import com.dh.Proyecto.Final_BackEnd.model.dto.AdminProductDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.ProductDisplayDto;

import java.io.IOException;
import java.util.List;

public interface IRoomService {

    Room saveRoom(AdminProductDto adminProductDto) throws IOException; //Agregar room
    List<ProductDisplayDto> displayRooms() throws IOException;
    List<ProductDisplayDto> findAllRooms() throws Exception;//Listar todos los rooms que ya esten registrados
    void deleteRoom(Long id) throws Exception;//Eliminar los rooms
}
