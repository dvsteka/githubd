package com.example.demo.admin;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {
    private final AdminRepository repository;
    private final PasswordEncoder encoder = new BCryptPasswordEncoder();

    public AdminService(AdminRepository repository) {
        this.repository = repository;
    }

    public Optional<Admin> authenticate(String email, String rawPassword) {
        return repository.findByEmail(email)
                .filter(a -> encoder.matches(rawPassword, a.getPasswordHash()));
    }

    public Admin save(Admin admin) {
        admin.setPasswordHash(encoder.encode(admin.getPasswordHash()));
        return repository.save(admin);
    }
}