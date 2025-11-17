package com.example.demo.course;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

record CreateCourseRequest(String title, String description, String imageBase64, Long instructorId, String quizJson) {}
record UpdateCourseRequest(String title, String description, String imageBase64, String quizJson) {}
record CourseDto(Long id, String title, String description, String imageBase64, Long instructorId, String instructorName, String quizJson) {}

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:5173")
public class CourseController {
    private final CourseService service;

    public CourseController(CourseService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody CreateCourseRequest req) {
        try {
            var saved = service.create(req.title(), req.description(), req.imageBase64(), req.instructorId(), req.quizJson());
            return ResponseEntity.ok(toDto(saved));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Instructor not found");
        }
    }

    @GetMapping("/by-instructor/{id}")
    public ResponseEntity<List<CourseDto>> byInstructor(@PathVariable Long id) {
        var list = service.byInstructor(id).stream().map(this::toDto).toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/count")
    public ResponseEntity<Long> count() { return ResponseEntity.ok(service.count()); }

    @GetMapping
    public ResponseEntity<List<CourseDto>> all() {
        var list = service.findAll().stream().map(this::toDto).toList();
        return ResponseEntity.ok(list);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody UpdateCourseRequest req) {
        try {
            var updated = service.update(id, req.title(), req.description(), req.imageBase64(), req.quizJson());
            return ResponseEntity.ok(toDto(updated));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Course not found");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            service.delete(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Course not found");
        }
    }

    private CourseDto toDto(Course c) {
        return new CourseDto(
                c.getId(),
                c.getTitle(),
                c.getDescription(),
                c.getImageBase64(),
                c.getInstructor().getId(),
                c.getInstructor().getName(),
                c.getQuizJson()
        );
    }
}