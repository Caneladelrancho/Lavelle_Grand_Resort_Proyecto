package com.dh.Proyecto.Final_BackEnd.Controller;

import com.dh.Proyecto.Final_BackEnd.model.Room;
import com.dh.Proyecto.Final_BackEnd.model.dto.AdminProductDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.ProductDisplayDto;
import com.dh.Proyecto.Final_BackEnd.service.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/rooms")
public class RoomController {

    //Inyectar dependencias del roomService para poder llamar y usar los metedos
    private IRoomService iRoomService;

    @Autowired
    public RoomController(IRoomService iRoomService) {
        this.iRoomService = iRoomService;
    }


   //Guardar una habitación
    @PostMapping("/add")
    public ResponseEntity<?> save(@ModelAttribute AdminProductDto adminProductDto){
        try {
            Room savedRoom = iRoomService.saveRoom(adminProductDto);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);

        } catch (IllegalArgumentException e) {
            // Error 400 - El usuario hizo algo mal (nombre duplicado)
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());

        }catch (IOException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<?> displayRoomsForUser(){
        try {
            List<ProductDisplayDto> rooms = iRoomService.displayRooms();
            return ResponseEntity.ok(rooms);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error retrieving rooms: " + e.getMessage());
        }
    }

    @GetMapping("/admin")
    public ResponseEntity<?> getAllRooms(){
        try {
            List<ProductDisplayDto> rooms = iRoomService.findAllRooms();
            return ResponseEntity.ok(rooms);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: " + e.getMessage());

        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRoom(@PathVariable Long id){
        try{
            //Llamar al servicio para eliminar la habitacion
            iRoomService.deleteRoom(id);
            return ResponseEntity.ok("Room with ID " + id + " successfully deleted.");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting room: " + e.getMessage());
        }
    }



}












