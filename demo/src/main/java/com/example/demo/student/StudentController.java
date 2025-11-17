package com.example.demo.student;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

record SignupRequest(String name, String email, String password) {}
record StudentDto(Long id, String email, String name) {}
record StudentOverviewDto(Long id, String email, String name, java.time.LocalDateTime lastLoginAt, java.util.List<EnrollmentDto> enrollments) {}
record LoginRequest(String email, String password) {}
record EnrollRequest(Long studentId, Long courseId) {}
record SubmitQuizRequest(Long studentId, Long courseId, java.util.List<Integer> answers) {}
record EnrollmentDto(Long id, Long courseId, String courseTitle, int progress) {}

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {
    private final StudentService service;

    public StudentController(StudentService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<StudentDto> signup(@RequestBody SignupRequest req) {
        var saved = service.signup(req.name(), req.email(), req.password());
        return ResponseEntity.ok(new StudentDto(saved.getId(), saved.getEmail(), saved.getName()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        var opt = service.authenticate(req.email(), req.password());
        if (opt.isEmpty()) return ResponseEntity.status(401).body("Invalid credentials");
        var s = opt.get();
        return ResponseEntity.ok(new StudentDto(s.getId(), s.getEmail(), s.getName()));
    }

    @PostMapping("/enroll")
    public ResponseEntity<?> enroll(@RequestBody EnrollRequest req) {
        try {
            var e = service.enroll(req.studentId(), req.courseId());
            return ResponseEntity.ok(toDto(e));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body("Not found");
        }
    }

    @GetMapping("/enrollments/{studentId}")
    public ResponseEntity<java.util.List<EnrollmentDto>> enrollments(@PathVariable Long studentId) {
        var list = service.enrollments(studentId).stream().map(this::toDto).toList();
        return ResponseEntity.ok(list);
    }

    @PostMapping("/quiz/submit")
    public ResponseEntity<EnrollmentDto> submitQuiz(@RequestBody SubmitQuizRequest req) {
        var e = service.submitQuiz(req.studentId(), req.courseId(), req.answers());
        return ResponseEntity.ok(toDto(e));
    }

    @GetMapping
    public ResponseEntity<java.util.List<StudentDto>> listStudents() {
        var list = service.allStudents().stream().map(s -> new StudentDto(s.getId(), s.getEmail(), s.getName())).toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/admin/overview")
    public ResponseEntity<java.util.List<StudentOverviewDto>> overview() {
        var enrollments = service.allEnrollments();
        var byStudent = new java.util.HashMap<Long, java.util.List<EnrollmentDto>>();
        for (var e : enrollments) {
            byStudent.computeIfAbsent(e.getStudent().getId(), k -> new java.util.ArrayList<>()).add(toDto(e));
        }
        var list = service.allStudents().stream().map(s -> new StudentOverviewDto(
                s.getId(), s.getEmail(), s.getName(), s.getLastLoginAt(),
                byStudent.getOrDefault(s.getId(), java.util.List.of())
        )).toList();
        return ResponseEntity.ok(list);
    }

    @GetMapping("/instructor/overview/{instructorId}")
    public ResponseEntity<java.util.List<StudentOverviewDto>> instructorOverview(@PathVariable Long instructorId) {
        var enrollments = service.enrollmentsByInstructor(instructorId);
        var byStudent = new java.util.HashMap<Long, java.util.List<EnrollmentDto>>();
        var studentIds = new java.util.HashSet<Long>();
        for (var e : enrollments) {
            var id = e.getStudent().getId();
            studentIds.add(id);
            byStudent.computeIfAbsent(id, k -> new java.util.ArrayList<>()).add(toDto(e));
        }
        var list = service.allStudents().stream()
                .filter(s -> studentIds.contains(s.getId()))
                .map(s -> new StudentOverviewDto(
                        s.getId(), s.getEmail(), s.getName(), s.getLastLoginAt(),
                        byStudent.getOrDefault(s.getId(), java.util.List.of())
                )).toList();
        return ResponseEntity.ok(list);
    }

    private EnrollmentDto toDto(Enrollment e) {
        return new EnrollmentDto(e.getId(), e.getCourse().getId(), e.getCourse().getTitle(), e.getProgress());
    }
}