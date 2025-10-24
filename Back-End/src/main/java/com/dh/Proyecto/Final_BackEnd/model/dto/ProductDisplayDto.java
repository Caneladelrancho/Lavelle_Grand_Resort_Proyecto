package com.dh.Proyecto.Final_BackEnd.model.dto;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class ProductDisplayDto {

    private Long Id;
    private String name;
    private String description;
    private List<String> imagesUrl;
    private String type;

    public ProductDisplayDto() {
    }

    public ProductDisplayDto(Long id, String name, String description, List<String> imagesUrl, String type) {
        Id = id;
        this.name = name;
        this.description = description;
        this.imagesUrl = imagesUrl;
        this.type = type;
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        Id = id;
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

    public List<String> getImagesUrl() {
        return imagesUrl;
    }

    public void setImagesUrl(List<String> imagesUrl) {
        this.imagesUrl = imagesUrl;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "ProductDisplayDto{" +
                "Id=" + Id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", imagesUrl=" + imagesUrl +
                ", type='" + type + '\'' +
                '}';
    }
}


