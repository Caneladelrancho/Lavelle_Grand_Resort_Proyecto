package com.dh.Proyecto.Final_BackEnd.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "images")
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long Id;

    @Column(name = "name")
    private String name;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    @ManyToOne
    @JoinColumn(name = "amenity_id")
    private Amenity amenity;


    // Constructor para Amenity (sin id)
    public Image(String name, String imageUrl, Amenity amenity) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.amenity = amenity;
        this.room = null;
    }

    public Image(String name, String imageUrl, Room room) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.room = room;
        this.amenity = null;
    }
}
