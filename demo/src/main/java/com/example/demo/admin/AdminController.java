package com.example.demo.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

record LoginRequest(String email, String password) {}
record AdminDto(Long id, String email, String name) {}

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {
    private final AdminService service;

    public AdminController(AdminService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        var opt = service.authenticate(req.email(), req.password());
        if (opt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        var a = opt.get();
        return ResponseEntity.ok(new AdminDto(a.getId(), a.getEmail(), a.getName()));
    }
}