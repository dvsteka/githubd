package com.example.demo.student;

import com.example.demo.course.Course;
import com.example.demo.course.CourseRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    private final StudentRepository students;
    private final EnrollmentRepository enrollments;
    private final CourseRepository courses;
    private final PasswordEncoder encoder = new BCryptPasswordEncoder();

    public StudentService(StudentRepository students, EnrollmentRepository enrollments, CourseRepository courses) {
        this.students = students;
        this.enrollments = enrollments;
        this.courses = courses;
    }

    public Student signup(String name, String email, String rawPassword) {
        Student s = new Student();
        s.setName(name);
        s.setEmail(email);
        s.setPasswordHash(encoder.encode(rawPassword));
        return students.save(s);
    }

    public Optional<Student> authenticate(String email, String rawPassword) {
        return students.findByEmail(email)
                .filter(s -> encoder.matches(rawPassword, s.getPasswordHash()))
                .map(s -> {
                    s.setLastLoginAt(java.time.LocalDateTime.now());
                    return students.save(s);
                });
    }

    public List<Student> allStudents() {
        return students.findAll();
    }

    public List<Enrollment> allEnrollments() { return enrollments.findAll(); }

    public List<Enrollment> enrollmentsByInstructor(Long instructorId) {
        return enrollments.findByCourse_Instructor_Id(instructorId);
    }

    public Enrollment enroll(Long studentId, Long courseId) {
        Student s = students.findById(studentId).orElseThrow(() -> new IllegalArgumentException("Student not found"));
        Course c = courses.findById(courseId).orElseThrow(() -> new IllegalArgumentException("Course not found"));
        var existing = enrollments.findByStudent_IdAndCourse_Id(studentId, courseId);
        if (existing.isPresent()) return existing.get();
        Enrollment e = new Enrollment();
        e.setStudent(s);
        e.setCourse(c);
        e.setProgress(0);
        return enrollments.save(e);
    }

    public List<Enrollment> enrollments(Long studentId) {
        return enrollments.findByStudent_Id(studentId);
    }

    public Enrollment submitQuiz(Long studentId, Long courseId, List<Integer> answers) {
        Course c = courses.findById(courseId).orElseThrow(() -> new IllegalArgumentException("Course not found"));
        var e = enrollments.findByStudent_IdAndCourse_Id(studentId, courseId)
                .orElseGet(() -> enroll(studentId, courseId));
        String q = c.getQuizJson();
        int percent = 0;
        if (q != null && !q.isEmpty()) {
            try {
                percent = computePercent(q, answers);
            } catch (Exception ignored) {}
        }
        e.setProgress(percent);
        return enrollments.save(e);
    }

    private int computePercent(String quizJson, List<Integer> answers) {
        var arrStart = quizJson.indexOf("[");
        var arrEnd = quizJson.lastIndexOf("]");
        if (arrStart < 0 || arrEnd < 0) return 0;
        String arr = quizJson.substring(arrStart, arrEnd + 1);
        int total = 0;
        int correct = 0;
        int idx = 0;
        int pos = 0;
        while (true) {
            int found = arr.indexOf("\"correctIndex\":", pos);
            if (found < 0) break;
            int colon = arr.indexOf(":", found);
            int comma = arr.indexOf(",", colon + 1);
            int end = comma > 0 ? comma : arr.indexOf("}", colon + 1);
            String num = arr.substring(colon + 1, end).trim();
            int correctIndex = Integer.parseInt(num);
            if (idx < answers.size() && answers.get(idx) == correctIndex) correct++;
            total++;
            idx++;
            pos = end + 1;
        }
        if (total == 0) return 0;
        return Math.round((correct * 100f) / total);
    }
}