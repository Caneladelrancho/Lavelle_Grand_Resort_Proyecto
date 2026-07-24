package com.dh.Proyecto.Final_BackEnd.service;

import com.dh.Proyecto.Final_BackEnd.model.Amenity;
import com.dh.Proyecto.Final_BackEnd.model.Image;
import com.dh.Proyecto.Final_BackEnd.model.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface IImageService {
    String processAndSaveFile(MultipartFile file) throws IOException;
    Image saveImageRoom(MultipartFile file, Room room) throws IOException;
    Image saveImageAmenity(MultipartFile file, Amenity amenity) throws IOException;
    List<String> findImageUrlsRoom(Room room) throws Exception;
    List<String> findImageUrlsAmenity(Amenity amenity) throws Exception;
    void deletePhysicalFile(String filePath) throws IOException;
}
