package com.dh.Proyecto.Final_BackEnd.model;

import jakarta.persistence.*;

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

    public Image() {
    }

    public Image(Long id, String name, String imageUrl, Room room, Amenity amenity) {
        Id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.room = room;
        this.amenity = amenity;
    }

    public Image(String name, String imageUrl, Room room) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.room = room;
        this.amenity = null;
    }

    // Constructor para Amenity (sin id)
    public Image(String name, String imageUrl, Amenity amenity) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.amenity = amenity;
        this.room = null;
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

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Room getRoom() {
        return room;
    }

    public void setRoom(Room room) {
        this.room = room;
    }

    public Amenity getProduct() {
        return amenity;
    }

    public void setProduct(Amenity amenity) {
        this.amenity = amenity;
    }
}
