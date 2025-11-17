package com.example.demo.instructor;

import com.example.demo.course.CourseRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

@Service
public class InstructorService {
    private final InstructorRepository repository;
    private final CourseRepository courses;
    private final PasswordEncoder encoder = new BCryptPasswordEncoder();
    private final SecureRandom random = new SecureRandom();

    public InstructorService(InstructorRepository repository, CourseRepository courses) {
        this.repository = repository;
        this.courses = courses;
    }

    public String generatePassword() {
        String chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789@$!%*#?&";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 10; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }

    public Instructor saveWithPassword(String name, String email, String plainPassword) {
        Instructor i = new Instructor();
        i.setName(name);
        i.setEmail(email);
        i.setPasswordHash(encoder.encode(plainPassword));
        return repository.save(i);
    }

    public Optional<Instructor> authenticate(String email, String rawPassword) {
        return repository.findByEmail(email)
                .filter(a -> encoder.matches(rawPassword, a.getPasswordHash()));
    }

    public List<Instructor> findAll() {
        return repository.findAll();
    }

    public long count() {
        return repository.count();
    }

    public void delete(Long id) {
        if (id == null) throw new IllegalArgumentException("Invalid id");
        var exists = repository.existsById(id);
        if (!exists) throw new IllegalArgumentException("Instructor not found");
        var hasCourses = !courses.findByInstructor_Id(id).isEmpty();
        if (hasCourses) throw new IllegalStateException("Instructor has courses");
        repository.deleteById(id);
    }
}