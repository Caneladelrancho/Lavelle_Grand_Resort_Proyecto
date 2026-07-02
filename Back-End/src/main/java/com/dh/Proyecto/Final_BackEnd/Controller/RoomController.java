package com.dh.Proyecto.Final_BackEnd.Controller;

import com.dh.Proyecto.Final_BackEnd.model.Room;
import com.dh.Proyecto.Final_BackEnd.model.dto.AdminProductDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.ProductDisplayDto;
import com.dh.Proyecto.Final_BackEnd.model.dto.RoomResponseDto;
import com.dh.Proyecto.Final_BackEnd.service.IRoomService;
import jakarta.validation.Valid;
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
    public ResponseEntity<RoomResponseDto> save(@Valid @ModelAttribute AdminProductDto adminProductDto) throws IOException{
        RoomResponseDto savedRoom = iRoomService.saveRoom(adminProductDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRoom);
    }

    @GetMapping
    public ResponseEntity<List<ProductDisplayDto>> displayRoomsForUser() throws IOException{
        List<ProductDisplayDto> rooms = iRoomService.displayRooms();
        return ResponseEntity.ok(rooms);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<ProductDisplayDto>> getAllRooms() throws Exception{
        List<ProductDisplayDto> rooms = iRoomService.findAllRooms();
        return ResponseEntity.ok(rooms);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoom(@PathVariable Long id) throws Exception{
        iRoomService.deleteRoom(id);
        return ResponseEntity.ok("Habitación con ID " + id + " eliminada exitosamente");
    }
}












