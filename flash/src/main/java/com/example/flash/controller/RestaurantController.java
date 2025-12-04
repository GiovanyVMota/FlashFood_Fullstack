package com.example.flash.controller;

import com.example.flash.model.Restaurant;
import com.example.flash.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/restaurants")
@CrossOrigin(origins = "*")
public class RestaurantController {

    @Autowired
    private RestaurantRepository repository;

    @GetMapping
    public List<Restaurant> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Restaurant salvar(@RequestBody Restaurant restaurant) {
        if (restaurant.getNota() == null) restaurant.setNota(5.0);
        return repository.save(restaurant);
    }

    // NOVO: Atualizar
    @PutMapping("/{id}")
    public Restaurant atualizar(@PathVariable Long id, @RequestBody Restaurant restAtualizado) {
        return repository.findById(id).map(rest -> {
            rest.setNome(restAtualizado.getNome());
            rest.setCategoria(restAtualizado.getCategoria());
            rest.setEmailProprietario(restAtualizado.getEmailProprietario());
            rest.setImagemUrl(restAtualizado.getImagemUrl());
            return repository.save(rest);
        }).orElse(null);
    }

    // NOVO: Deletar
    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        repository.deleteById(id);
    }
}