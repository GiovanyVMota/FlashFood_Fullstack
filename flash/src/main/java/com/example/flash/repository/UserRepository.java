package com.example.flash.repository;

import com.example.flash.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Métodos para login e verificação de email
    Optional<User> findByEmail(String email);
    Optional<User> findByEmailAndSenha(String email, String senha);
}
