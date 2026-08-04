package com.studentplacement.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "student_name", nullable = false)
    private String studentName;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private Double cgpa;

    @Column(name = "tenth_percentage", nullable = false)
    private Double tenthPercentage;

    @Column(name = "twelfth_percentage", nullable = false)
    private Double twelfthPercentage;

    @Column(name = "programming_skill", nullable = false)
    private String programmingSkill;

    @Column(name = "communication_skill", nullable = false)
    private String communicationSkill;

    @Column(nullable = false)
    private Boolean internship;

    @Column(name = "projects_completed", nullable = false)
    private Integer projectsCompleted;

    @Column(nullable = false)
    private Integer certifications;
}
