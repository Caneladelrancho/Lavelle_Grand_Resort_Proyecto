package com.dh.Proyecto.Final_BackEnd.model;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "description", length = 2000)
    private String description;
    @Column(name = "room_number")
    private String roomNumber;
    @Column(name = "cost")
    private Double cost;
    @Column(name = "availability")
    private Boolean availability;
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Image> images;//array de imagenes
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Reservation> reservations;

    public Room() {
    }

    /*public Room(Long id, String roomNumber, Double cost, Boolean availability, List<Image> images, Hotel hotel, List<Reservation> reservations) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.cost = cost;
        this.availability = availability;
        this.images = images;
        this.hotel = hotel;
        this.reservations = reservations;
    }

    public Room(String roomNumber, Double cost, Boolean availability, List<Image> images, Hotel hotel, List<Reservation> reservations) {
        this.roomNumber = roomNumber;
        this.cost = cost;
        this.availability = availability;
        this.images = images;
        this.hotel = hotel;
        this.reservations = reservations;
    }*/

    public Long getId() {
        return id;
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

    public void setId(Long id) {
        this.id = id;
    }

    public String getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(String roomNumber) {
        this.roomNumber = roomNumber;
    }

    public Double getCost() {
        return cost;
    }

    public void setCost(Double cost) {
        this.cost = cost;
    }

    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
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

    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", roomNumber='" + roomNumber + '\'' +
                ", cost=" + cost +
                ", availability=" + availability +
                ", images=" + images +
                ", reservations=" + reservations +
                '}';
    }
}





