package com.studentplacement.backend.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FastApiPredictionRequest {

    private Integer age;

    private String gender;

    private BigDecimal cgpa;

    private String branch;

    private String college_tier;

    private Integer internships_count;

    private Integer projects_count;

    private Integer certifications_count;

    private Integer coding_skill_score;

    private Integer communication_skill_score;

    private Integer aptitude_score;

    private Integer logical_reasoning_score;

    private Integer mock_interview_score;

    private Integer backlogs;
}
