package com.example.flash.repository;

import com.example.flash.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Método customizado para buscar produtos pelo ID do restaurante
    // O Spring cria o SQL automaticamente baseado no nome do método
    List<Product> findByRestaurantId(Long restaurantId);
}