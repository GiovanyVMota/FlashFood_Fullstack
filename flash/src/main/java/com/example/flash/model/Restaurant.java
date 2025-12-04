package com.example.flash.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String categoria;

    @Column(name = "email_proprietario")
    private String emailProprietario;

    private String imagemUrl;
    private Double nota = 5.0;
}