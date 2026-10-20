package com.dh.Proyecto.Final_BackEnd.service.impl;

import com.dh.Proyecto.Final_BackEnd.exceptions.DuplicateResourceException;
import com.dh.Proyecto.Final_BackEnd.exceptions.ResourceNotFoundException;
import com.dh.Proyecto.Final_BackEnd.entity.Characteristic;
import com.dh.Proyecto.Final_BackEnd.entity.Room;
import com.dh.Proyecto.Final_BackEnd.entity.dto.CharacteristicRequestDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.CharacteristicResponseDto;
import com.dh.Proyecto.Final_BackEnd.repository.ICharecteristicRepository;
import com.dh.Proyecto.Final_BackEnd.repository.IRoomRepository;
import com.dh.Proyecto.Final_BackEnd.service.ICharacteristicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CharacteristicService implements ICharacteristicService {

    private final ICharecteristicRepository charecteristicRepository;
    private final IRoomRepository roomRepository;


    //CREAR CARACTERISTICA
    @Override
    public CharacteristicResponseDto createCharacteristic(CharacteristicRequestDto characteristicRequestDto) throws IOException {

        //Validar duplicados
        Optional<Characteristic> existingCharacteristic = charecteristicRepository.findByName(characteristicRequestDto.getName());
        if (existingCharacteristic.isPresent()){
            throw new DuplicateResourceException("Ya existe a una característica con el nombre: " + characteristicRequestDto.getName());
        }

        try{
            //Crear objeto characteristic
            Characteristic characteristic = new Characteristic();
            characteristic.setName(characteristicRequestDto.getName());
            characteristic.setIcon(characteristicRequestDto.getIcon());

            Characteristic savedCharacteristic = charecteristicRepository.save(characteristic);

            return new CharacteristicResponseDto(
                    savedCharacteristic.getId(),
                    savedCharacteristic.getName(),
                    savedCharacteristic.getIcon()
            );

        }catch (Exception e){
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<CharacteristicResponseDto> findAllCharacteristics() throws Exception {
        try{
            List<Characteristic> characteristics = charecteristicRepository.findAll();

            if (characteristics.isEmpty()){
                return new ArrayList<>();
            }

            List<CharacteristicResponseDto> characteristicResponseDtos = new ArrayList<>();

            for (Characteristic characteristic : characteristics){
                CharacteristicResponseDto characteristicResponseDto = new CharacteristicResponseDto();
                characteristicResponseDto.setId(characteristic.getId());
                characteristicResponseDto.setName(characteristic.getName());
                characteristicResponseDto.setIcon(characteristic.getIcon());

                characteristicResponseDtos.add(characteristicResponseDto);
            }
            return characteristicResponseDtos;
        }catch (Exception e){
            throw new Exception("Unable to retrieve characteristics: " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteCharacteristic(Long id) throws Exception {

        Characteristic characteristic = charecteristicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Characteristic not found with id: " + id));

        //Desconectar la relación de room con las características antes de borrar
        for (Room room : characteristic.getRooms()){
            room.getCharacteristics().remove(characteristic);
            roomRepository.save(room);
        }

        charecteristicRepository.deleteById(id);
    }

    @Override
    public CharacteristicResponseDto updateCharacteristic(Long id, CharacteristicRequestDto characteristicRequestDto) throws IOException {

        Characteristic characteristic = charecteristicRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Characteristic not found with id: " + id));

        try{
            characteristic.setName(characteristicRequestDto.getName());
            characteristic.setIcon(characteristicRequestDto.getIcon());

            Characteristic updatedCharacteristic = charecteristicRepository.save(characteristic);

            return new CharacteristicResponseDto(
                    updatedCharacteristic.getId(),
                    updatedCharacteristic.getName(),
                    updatedCharacteristic.getIcon()

            );

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new RuntimeException(e);
        }

    }
}
