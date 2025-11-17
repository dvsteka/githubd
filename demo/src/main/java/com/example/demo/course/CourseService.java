package com.example.demo.course;

import com.example.demo.instructor.Instructor;
import com.example.demo.instructor.InstructorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {
    private final CourseRepository courses;
    private final InstructorRepository instructors;

    public CourseService(CourseRepository courses, InstructorRepository instructors) {
        this.courses = courses;
        this.instructors = instructors;
    }

    public Course create(String title, String description, String imageBase64, Long instructorId, String quizJson) {
        Instructor instructor = instructors.findById(instructorId).orElseThrow(() -> new IllegalArgumentException("Instructor not found"));
        Course c = new Course();
        c.setTitle(title);
        c.setDescription(description);
        c.setImageBase64(imageBase64);
        c.setQuizJson(quizJson);
        c.setInstructor(instructor);
        return courses.save(c);
    }

    public List<Course> byInstructor(Long instructorId) {
        return courses.findByInstructor_Id(instructorId);
    }

    public long count() {
        return courses.count();
    }

    public List<Course> findAll() {
        return courses.findAll();
    }

    public Course update(Long id, String title, String description, String imageBase64, String quizJson) {
        Course c = courses.findById(id).orElseThrow(() -> new IllegalArgumentException("Course not found"));
        if (title != null) c.setTitle(title);
        if (description != null) c.setDescription(description);
        if (imageBase64 != null) c.setImageBase64(imageBase64);
        if (quizJson != null) c.setQuizJson(quizJson);
        return courses.save(c);
    }

    public void delete(Long id) {
        if (!courses.existsById(id)) throw new IllegalArgumentException("Course not found");
        courses.deleteById(id);
    }
}