package com.example.demo.student;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudent_Id(Long studentId);
    Optional<Enrollment> findByStudent_IdAndCourse_Id(Long studentId, Long courseId);
    List<Enrollment> findByCourse_Instructor_Id(Long instructorId);
}