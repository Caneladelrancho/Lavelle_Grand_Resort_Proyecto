package com.dh.Proyecto.Final_BackEnd.repository;

import com.dh.Proyecto.Final_BackEnd.model.Amenity;
import com.dh.Proyecto.Final_BackEnd.model.Image;
import com.dh.Proyecto.Final_BackEnd.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IImageRepository extends JpaRepository<Image, Long> {
    List<Image> findByRoom(Room room);
    List<Image> findByRoomId(Long roomId);
    List<Image> findByAmenity(Amenity amenity);
    List<Image> findByAmenityId(Long amenityId);


}
