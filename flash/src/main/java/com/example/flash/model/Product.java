package com.example.flash.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private Double preco;
    private String categoria;
    private String imagemUrl;

    @Column(name = "restaurant_id")
    private Long restaurantId;

    @UpdateTimestamp
    @Column(name = "data_atualizado")
    private LocalDateTime dataAtualizado;
}