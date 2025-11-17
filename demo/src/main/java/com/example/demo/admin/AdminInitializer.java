package com.example.demo.admin;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminInitializer implements CommandLineRunner {
    private final AdminRepository repository;
    private final AdminService service;

    public AdminInitializer(AdminRepository repository, AdminService service) {
        this.repository = repository;
        this.service = service;
    }

    @Override
    public void run(String... args) {
        if (repository.findByEmail("admin@learnhub.com").isEmpty()) {
            Admin a = new Admin();
            a.setEmail("admin@learnhub.com");
            a.setPasswordHash("admin123");
            a.setName("Admin");
            service.save(a);
        }
    }
}