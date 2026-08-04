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
public class PredictionRequest {

    private Integer age;

    private String gender;

    private BigDecimal cgpa;

    private String branch;

    private Integer collegeTier;

    private Integer internshipsCount;

    private Integer projectsCount;

    private Integer certificationsCount;

    private Integer codingSkillScore;

    private Integer communicationSkillScore;

    private Integer aptitudeScore;

    private Integer logicalReasoningScore;

    private Integer mockInterviewScore;

    private Integer backlogs;
}
