package com.example.flash.controller;

import com.example.flash.model.Product;
import com.example.flash.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductRepository repository;

    @GetMapping
    public List<Product> listar(@RequestParam(required = false, name = "restaurant_id") Long restaurantId) {
        if (restaurantId != null) {
            return repository.findByRestaurantId(restaurantId);
        }
        return repository.findAll();
    }

    @PostMapping
    public Product salvar(@RequestBody Product product) {
        return repository.save(product);
    }

    @PutMapping("/{id}")
    public Product atualizar(@PathVariable Long id, @RequestBody Product produtoAtualizado) {
        return repository.findById(id).map(prod -> {
            prod.setNome(produtoAtualizado.getNome());
            prod.setDescricao(produtoAtualizado.getDescricao());
            prod.setPreco(produtoAtualizado.getPreco());
            prod.setCategoria(produtoAtualizado.getCategoria());
            prod.setImagemUrl(produtoAtualizado.getImagemUrl());
            return repository.save(prod);
        }).orElse(null);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}