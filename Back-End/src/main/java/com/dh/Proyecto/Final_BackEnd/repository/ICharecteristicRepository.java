package com.dh.Proyecto.Final_BackEnd.repository;

import com.dh.Proyecto.Final_BackEnd.entity.Characteristic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ICharecteristicRepository extends JpaRepository<Characteristic, Long> {
    Optional<Characteristic> findByName(String name);




}
