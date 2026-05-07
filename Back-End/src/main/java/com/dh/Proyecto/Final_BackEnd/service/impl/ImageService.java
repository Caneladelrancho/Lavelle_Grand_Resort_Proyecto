package com.dh.Proyecto.Final_BackEnd.service.impl;

import com.dh.Proyecto.Final_BackEnd.model.Amenity;
import com.dh.Proyecto.Final_BackEnd.model.Image;
import com.dh.Proyecto.Final_BackEnd.model.Room;
import com.dh.Proyecto.Final_BackEnd.repository.IImageRepository;
import com.dh.Proyecto.Final_BackEnd.service.IImageService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ImageService implements IImageService {

    @Autowired
    private IImageRepository imageRepository;

    //Constante para almacenar la ruta de la carpeta de las imágenes
    private static final Path ROOT_LOCATION = Paths.get("uploads");

    //Formatos permitidos para las imágenes
    private static final List<String> ALLOWED_FORMATS = Arrays.asList("image/jpeg", "image/jpg", "image/png");

    private static final String BASE_URL = "http://localhost:8080/images/";

    @PostConstruct
    public void init(){
        try{
            if (!Files.exists(ROOT_LOCATION)){
                Files.createDirectories(ROOT_LOCATION);
                System.out.println("Upload directory created: " + ROOT_LOCATION.toAbsolutePath());
            }
        }catch (IOException e){
            throw new RuntimeException("Could not create upload folder!", e);
        }
    }

    //Validar los archivos de las imágenes
    private void validateImageFile(MultipartFile file) throws IOException{

        if (file.isEmpty()){
            throw new IOException("The file is empty");
        }

        if (!ALLOWED_FORMATS.contains(file.getContentType())){
            throw new IOException("Invalid format file. Only JPG, JPEG and PNG are allowed");
        }

    }
    //Limpiar el nombre de la imagen en caso tal de que tenga caracteres no válidos
    private String sanitizeFileName(String filename) {
        return filename.replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
    }

    private String processFileName(String originalFileName) throws IOException{
        if (originalFileName == null){
            throw new IOException("Invalid file name");
        }

        String sanitizedFileName = sanitizeFileName(originalFileName);

        return UUID.randomUUID().toString() + "_" + sanitizedFileName;
    }

    private String processAndSaveFile(MultipartFile file) throws IOException {

        String fileName = processFileName(file.getOriginalFilename());
        Path destinationFile = ROOT_LOCATION.resolve(Paths.get(fileName));

        try {
            Files.copy(file.getInputStream(), destinationFile);
        } catch (IOException e) {
            throw new IOException("Failed to store file " + destinationFile.getFileName(), e);
        }

        return destinationFile.toString();
    }

    @Override
    public Image saveImageRoom(MultipartFile file, Room room) throws IOException {

        String filePath = processAndSaveFile(file);
        String fileName = processFileName(file.getOriginalFilename());

        Image image = new Image(fileName, filePath, room);
        return imageRepository.save(image);
    }

    @Override
    public Image saveImageAmenity(MultipartFile file, Amenity amenity) throws IOException {

        String filePath = processAndSaveFile(file);
        String fileName = processFileName(file.getOriginalFilename());

        Image image = new Image(fileName, filePath, amenity);
        return imageRepository.save(image);
    }

    @Override
    public List<String> findImageUrlsRoom(Room room) throws Exception {
        try {
            List<Image> images = imageRepository.findByRoom(room);
            //Convertir las imagenes a URLs
            return images.stream()
                    .map(image -> {
                        Path path = Paths.get(image.getImageUrl());
                        String fileName = path.getFileName().toString();

                        return BASE_URL + fileName;

                    })
                    .collect(Collectors.toList());

        }catch (Exception e){
            throw new Exception("Unable to retrieve images" + e.getMessage(), e);
        }
    }

    @Override
    public List<String> findImageUrlsAmenity(Amenity amenity) throws Exception {
        try{
            List<Image> images = imageRepository.findByAmenity(amenity);
            return images.stream()
                    .map(image -> {
                        Path path = Paths.get(image.getImageUrl());
                        String fileName = path.getFileName().toString();

                        return BASE_URL + fileName;

                    })
                    .collect(Collectors.toList());

        }catch (Exception e){
            throw new Exception("Unable to retreive images" + e.getMessage(), e);
        }

    }

    @Override
    public void deleteImagesRoom(Long id) throws IOException {
        try{
            List<Image> images = imageRepository.findByRoomId(id);

            if (!images.isEmpty()){
                for (Image image : images){
                    //Eliminar archivo fisico
                    try{
                        Path oldPath = Paths.get(image.getImageUrl());
                        String fileName = oldPath.getFileName().toString();
                        Path newPath = ROOT_LOCATION.resolve(fileName);

                        if (Files.exists(newPath)){
                            Files.delete(newPath);
                        }
                    }catch (IOException e){
                        System.out.println("Warning: Could not delete physical file: " + image.getImageUrl());
                    }
                }
                imageRepository.deleteAll(images);
            }
        }catch (Exception e){
            throw new IOException("Unable to delete images for room ID " + id + ": " + e.getMessage(), e);
        }
    }

    @Override
    public void deleteImagesAmenity(Long id) throws IOException {
        try{
            List<Image> images = imageRepository.findByAmenityId(id);

            if (!images.isEmpty()){
                for (Image image : images){
                    //Eliminar archivo fisico
                    try{
                        Path oldPath = Paths.get(image.getImageUrl());
                        String fileName = oldPath.getFileName().toString();
                        Path newPath = ROOT_LOCATION.resolve(fileName);

                        if (Files.exists(newPath)){
                            Files.delete(newPath);
                        }
                    }catch (IOException e){
                        System.out.println("Warning: Could not delete physical file: " + image.getImageUrl());
                    }
                }
                imageRepository.deleteAll(images);
            }
        }catch (Exception e){
            throw new IOException("Unable to delete images for amenity ID " + id + ": " + e.getMessage(), e);
        }

    }






}
