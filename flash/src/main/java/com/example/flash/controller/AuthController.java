package com.example.flash.controller;

import com.example.flash.model.User;
import com.example.flash.repository.UserRepository;
import com.example.flash.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth") // MUDOU AQUI
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository repository;

    @Autowired
    private TokenService tokenService; // Injeta o serviço

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (repository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email já cadastrado!"));
        }
        User salvo = repository.save(user);
        String token = tokenService.gerarToken(salvo); // Gera token real

        return ResponseEntity.ok(Map.of(
                "id", salvo.getId(),
                "nome", salvo.getNome(),
                "email", salvo.getEmail(),
                "token", token
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credenciais) {
        String email = credenciais.get("email");
        String senha = credenciais.get("senha");

        // Em prod, use BCrypt para comparar senha criptografada!
        return repository.findByEmailAndSenha(email, senha)
                .map(user -> {
                    String token = tokenService.gerarToken(user); // Gera token real
                    return ResponseEntity.ok(Map.of(
                            "id", user.getId(),
                            "nome", user.getNome(),
                            "email", user.getEmail(),
                            "token", token
                    ));
                })
                .orElse(ResponseEntity.status(401).body(Map.of("message", "Email ou senha inválidos")));
    }
}