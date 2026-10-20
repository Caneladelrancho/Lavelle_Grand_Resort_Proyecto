package com.dh.Proyecto.Final_BackEnd.service.impl;

import com.dh.Proyecto.Final_BackEnd.exceptions.DuplicateResourceException;
import com.dh.Proyecto.Final_BackEnd.exceptions.ResourceNotFoundException;
import com.dh.Proyecto.Final_BackEnd.entity.Category;
import com.dh.Proyecto.Final_BackEnd.entity.Characteristic;
import com.dh.Proyecto.Final_BackEnd.entity.Image;
import com.dh.Proyecto.Final_BackEnd.entity.Room;
import com.dh.Proyecto.Final_BackEnd.entity.dto.*;
import com.dh.Proyecto.Final_BackEnd.mapper.CategoryMapper;
import com.dh.Proyecto.Final_BackEnd.mapper.CharacteristicMapper;
import com.dh.Proyecto.Final_BackEnd.mapper.RoomMapper;
import com.dh.Proyecto.Final_BackEnd.repository.ICategoryRepository;
import com.dh.Proyecto.Final_BackEnd.repository.ICharecteristicRepository;
import com.dh.Proyecto.Final_BackEnd.repository.IImageRepository;
import com.dh.Proyecto.Final_BackEnd.repository.IRoomRepository;
import com.dh.Proyecto.Final_BackEnd.service.IImageService;
import com.dh.Proyecto.Final_BackEnd.service.IRoomService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class RoomService implements IRoomService {


    private final IRoomRepository roomRepository;
    private final IImageService imageService;
    private final IImageRepository imageRepository;
    private final ICategoryRepository categoryRepository;
    private final ICharecteristicRepository characteristicRepository;
    private final CategoryMapper categoryMapper;
    private final CharacteristicMapper characteristicMapper;
    private final RoomMapper roomMapper;



    //GUARDAR O AGREGAR UN ROOM CON IMÁGENES
    @Override
    public RoomResponseDto saveRoom(AdminProductDto adminProductDto) throws IOException {

        Optional<Room> existingRoom = roomRepository.findByName(adminProductDto.getName());
        if (existingRoom.isPresent()){
            throw new DuplicateResourceException("Ya existe una habitación con el nombre: " + adminProductDto.getName());
        }

            //Crear una entidad room y desde adminProductDto se asignan los valores, pero sin las imágenes
            Room room = new Room();
            room.setName(adminProductDto.getName());
            room.setDescription(adminProductDto.getDescription());

            Category category = categoryRepository.findById(adminProductDto.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + adminProductDto.getCategoryId()));
            room.setCategory(category);

            //Validar que la lista de characteristics no venga vacia o no sea null, si pasa, se busca en la BD las characteristics
            //y se asignan a la room
            if (adminProductDto.getCharacteristicIds() != null && !adminProductDto.getCharacteristicIds().isEmpty()){
                List<Characteristic> characteristics = characteristicRepository.findAllById(adminProductDto.getCharacteristicIds());
                room.setCharacteristics(characteristics);
            }

            Room savedRoom = roomRepository.save(room); //Guardar Room en la BD

            //Manejar varias imágenes si están presentes
            if (adminProductDto.getImages() != null && !adminProductDto.getImages().isEmpty()) {
                for (MultipartFile imageFile : adminProductDto.getImages()) {
                    imageService.saveImageRoom(imageFile, savedRoom);
                }
            }

            //Convertir category a categoryResponseDto llamando al mapper de category
            CategoryResponseDto categoryResponseDto = categoryMapper.mapCategoryToCategoryResponseDto(category);

            List<CharacteristicResponseDto> characteristicResponseDtos = characteristicMapper.characteristicToResponseDtoList(savedRoom.getCharacteristics());

            return new RoomResponseDto(
                    savedRoom.getId(),
                    savedRoom.getName(),
                    savedRoom.getDescription(),
                    categoryResponseDto,
                    characteristicResponseDtos
            );
    }

    //MOSTRAR ROOMS AL USUARIO
    @Override
    public List<ProductDisplayDto> displayRooms() throws IOException {

        try {
            List<Room> rooms = roomRepository.findAll();

            if (rooms.isEmpty()){
                return new ArrayList<>();
            }

            List<ProductDisplayDto> displayDtos = new ArrayList<>();

            for (Room room : rooms){
                ProductDisplayDto displayDto = roomMapper.mapRoomToRoomDisplayDto(room);
                displayDtos.add(displayDto);
            }

            return displayDtos;
        }catch (Exception e){
            throw  new IOException("Unable to retrieve rooms for display: " + e.getMessage());
        }
    }

    //ENCONTRAR TODAS LAS HABITACIONES PARA EL ADMIN
    @Override
    public List<ProductDisplayDto> findAllRooms() throws Exception {
        try {
            //Traer todas las entidades de la BD y guardarlas en una lista
            List<Room> rooms = roomRepository.findAll();

            //Si la room no tiene imágenes que devuelva una lista vacía en vez de null
            if (rooms.isEmpty()){
                return new ArrayList<>();
            }

            // Crear una lista vacía de roomDto para almacenarlos
            List<ProductDisplayDto> productDisplayDtos = new ArrayList<>();

            for (Room room : rooms) {
                    // Crear un nuevo ProductDisplayDto con los datos básicos de la habitación
                    ProductDisplayDto productDisplayDto = roomMapper.mapRoomToRoomDisplayDto(room);

                    productDisplayDtos.add(productDisplayDto);
            }
            return productDisplayDtos;

        }catch (Exception e){
            throw new Exception("Unable to retrieve rooms for admin: " + e.getMessage(), e);
        }

    }
    /*primero eliminar la imagen y despues la habitacion por que en la base de datos
    hay una relacion que es Determinada por la room. Primero en el image service se hace la eliminacion de la imagen
    y despues se asocia ese en el room service*/
    @Override
    public void deleteRoom(Long id) throws Exception {

        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));

        List<Image> images = imageRepository.findByRoomId(id);

        for (Image image : images){
            imageService.deletePhysicalFile(image.getImageUrl());
        }

        imageRepository.deleteAll(images);
        roomRepository.delete(room);
    }

    @Override
    @Transactional
    public RoomResponseDto updateRoom(Long id, AdminProductDto adminProductDto) throws IOException {

        //1- buscar la room existente
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with id: " + id));

        //2- actualizar campos simples
        room.setName(adminProductDto.getName());
        room.setDescription(adminProductDto.getDescription());

        //3- buscar y asignar la nueva categoria
        Category category = categoryRepository.findById(adminProductDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " +  adminProductDto.getCategoryId()));
        room.setCategory(category);

        //4- reemplazar imagenes, si vienen nuevas en la peticion
        if (adminProductDto.getImages() != null && !adminProductDto.getImages().isEmpty()){

             //4a- Borrar las imagenes viejas en la bd y fisicas
            List<Image> oldImages = room.getImages();
            for (Image oldImage : oldImages){
                imageService.deletePhysicalFile(oldImage.getImageUrl());
            }
            oldImages.clear();



            //4b - Guardar las imagenes nuevas
            for (MultipartFile imageFile : adminProductDto.getImages()){
                imageService.saveImageRoom(imageFile, room);
            }
        }

        //5- Si no llega nada nuevo, no se ejecuta setCharacteristics y la room conserva las caracteristicas que ya tenia
        // cargadas desde el findbyid inicial
        if (adminProductDto.getCharacteristicIds() != null && !adminProductDto.getCharacteristicIds().isEmpty()){
            List<Characteristic> characteristics = characteristicRepository.findAllById(adminProductDto.getCharacteristicIds());
            room.setCharacteristics(characteristics);
        }

        //6- guardar cambios
        Room updatedRoom = roomRepository.save(room);

        //7-Convertir category a categoryResponseDto
        CategoryResponseDto categoryResponseDto = categoryMapper.mapCategoryToCategoryResponseDto(category);

        /*8-Convertir la lista de caracteristicas de la entidad characteristic a una nueva lista de characteristicResponseDto
        porque la entidad characteristic devuelve toda la entidad y en roomResponseDTO pusimos una lista de CharacteristicResponseDto,
        es un desajuste de tipos de datos y se llame y se hace desde el mapper de characteristic*/
        List<CharacteristicResponseDto> characteristicResponseDtos = characteristicMapper.characteristicToResponseDtoList(updatedRoom.getCharacteristics());

        //8- devolver dto de respuesta
        return  new RoomResponseDto(
                updatedRoom.getId(),
                updatedRoom.getName(),
                updatedRoom.getDescription(),
                categoryResponseDto,
                characteristicResponseDtos
        );

    }
}
