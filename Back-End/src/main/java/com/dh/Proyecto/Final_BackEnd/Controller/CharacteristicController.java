package com.dh.Proyecto.Final_BackEnd.Controller;

import com.dh.Proyecto.Final_BackEnd.entity.dto.CharacteristicRequestDto;
import com.dh.Proyecto.Final_BackEnd.entity.dto.CharacteristicResponseDto;
import com.dh.Proyecto.Final_BackEnd.service.ICharacteristicService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("api/characteristics")
@RequiredArgsConstructor
public class CharacteristicController {

    private final ICharacteristicService iCharacteristicService;

    @PostMapping("/add")
    public ResponseEntity<CharacteristicResponseDto> save(@Valid @RequestBody CharacteristicRequestDto characteristicRequestDto) throws IOException {
        CharacteristicResponseDto savedCharacteristic = iCharacteristicService.createCharacteristic(characteristicRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCharacteristic);
    }

    @GetMapping
    public ResponseEntity<List<CharacteristicResponseDto>> getAllCharacteristics() throws Exception{
        List<CharacteristicResponseDto> characteristics = iCharacteristicService.findAllCharacteristics();
        return ResponseEntity.ok(characteristics);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCharacteristic(@PathVariable Long id) throws Exception{
        iCharacteristicService.deleteCharacteristic(id);
        return ResponseEntity.ok("Característica con ID " + id + " eliminada exitosamente");
    }

    @PutMapping("/{id}")
    public ResponseEntity<CharacteristicResponseDto> updateCharacteristic(@PathVariable Long id, @Valid @RequestBody CharacteristicRequestDto characteristicRequestDto) throws IOException{
        CharacteristicResponseDto updateCharacteristic = iCharacteristicService.updateCharacteristic(id, characteristicRequestDto);
        return ResponseEntity.ok(updateCharacteristic);
    }


}
