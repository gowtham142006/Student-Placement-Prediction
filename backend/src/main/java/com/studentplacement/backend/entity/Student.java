package com.studentplacement.backend.entity;

import java.time.LocalDateTime;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
@Table(name = "students")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private String gender;

    @Column(nullable = false)
    private BigDecimal cgpa;

    @Column(nullable = false)
    private String branch;

    @Column(name = "college_tier", nullable = false)
    private Integer collegeTier;

    @Column(name = "internships_count", nullable = false)
    private Integer internshipsCount;

    @Column(name = "projects_count", nullable = false)
    private Integer projectsCount;

    @Column(name = "certifications_count", nullable = false)
    private Integer certificationsCount;

    @Column(name = "coding_skill_score", nullable = false)
    private Integer codingSkillScore;

    @Column(name = "communication_skill_score", nullable = false)
    private Integer communicationSkillScore;

    @Column(name = "aptitude_score", nullable = false)
    private Integer aptitudeScore;

    @Column(name = "logical_reasoning_score", nullable = false)
    private Integer logicalReasoningScore;

    @Column(name = "mock_interview_score", nullable = false)
    private Integer mockInterviewScore;

    @Column(nullable = false)
    private Integer backlogs;

    @Column(name = "placement_status", nullable = false)
    private Boolean placementStatus;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
