package com.dh.Proyecto.Final_BackEnd.model;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "Amenities")
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "amenity_id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "description", length = 2000)
    private String description;
    @Column(name = "needs_reservation")
    private Boolean needsReservation;
    @OneToMany(mappedBy = "amenity", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Image> images;
    @ManyToMany(mappedBy = "amenities")
    private List<Reservation> reservations;

    public Amenity() {
    }

    public Amenity(Long id, String name, String description, Boolean needsReservation, List<Image> images, List<Reservation> reservations) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.needsReservation = needsReservation;
        this.images = images;
        this.reservations = reservations;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }

    public List<Reservation> getReservations() {
        return reservations;
    }

    public void setReservations(List<Reservation> reservations) {
        this.reservations = reservations;
    }
}
