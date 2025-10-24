package com.dh.Proyecto.Final_BackEnd.model.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class AdminProductDto {

    private String name;
    private String description;
    private Boolean needsReservation;
    private List<MultipartFile> images;

    public AdminProductDto(String name, String description, Boolean needsReservation, List<MultipartFile> images) {
        this.name = name;
        this.description = description;
        this.needsReservation = needsReservation;
        this.images = images;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getNeedsReservation() {
        return needsReservation;
    }

    public void setNeedsReservation(Boolean needsReservation) {
        this.needsReservation = needsReservation;
    }

    public List<MultipartFile> getImages() {
        return images;
    }

    public void setImages(List<MultipartFile> images) {
        this.images = images;
    }

    @Override
    public String toString() {
        return "AdminProductDto{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", needsReservation=" + needsReservation +
                ", images=" + images +
                '}';
    }
}
