package com.example.demo.instructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

record CreateInstructorRequest(String name, String email) {}
record InstructorDto(Long id, String email, String name) {}
record CreateInstructorResponse(Long id, String email, String name, String temporaryPassword) {}

@RestController
@RequestMapping("/api/instructor")
@CrossOrigin(origins = "http://localhost:5173")
public class InstructorController {
    private final InstructorService service;

    public InstructorController(InstructorService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<CreateInstructorResponse> create(@RequestBody CreateInstructorRequest req) {
        String pwd = service.generatePassword();
        var saved = service.saveWithPassword(req.name(), req.email(), pwd);
        return ResponseEntity.ok(new CreateInstructorResponse(saved.getId(), saved.getEmail(), saved.getName(), pwd));
    }

    @GetMapping
    public ResponseEntity<List<InstructorDto>> list() {
        var list = service.findAll().stream().map(i -> new InstructorDto(i.getId(), i.getEmail(), i.getName())).toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count() {
        return ResponseEntity.ok(service.count());
    }

    record LoginRequest(String email, String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        var opt = service.authenticate(req.email(), req.password());
        if (opt.isEmpty()) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
        var i = opt.get();
        return ResponseEntity.ok(new InstructorDto(i.getId(), i.getEmail(), i.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Instructor not found");
        } catch (IllegalStateException e) {
            return ResponseEntity.status(409).body("Instructor has courses");
        }
    }
}