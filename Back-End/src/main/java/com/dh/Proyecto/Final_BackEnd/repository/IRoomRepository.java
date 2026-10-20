package com.dh.Proyecto.Final_BackEnd.repository;

import com.dh.Proyecto.Final_BackEnd.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IRoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByName(String name);
    Boolean existsByCategoryId(Long categoryId);

}
