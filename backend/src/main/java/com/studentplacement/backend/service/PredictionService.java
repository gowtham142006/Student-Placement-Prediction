package com.studentplacement.backend.service;

import com.studentplacement.backend.dto.FastApiPredictionRequest;
import com.studentplacement.backend.dto.FastApiPredictionResponse;
import com.studentplacement.backend.dto.PredictionRequest;
import com.studentplacement.backend.dto.PredictionResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

@Service
public class PredictionService {

    private final RestTemplate restTemplate;
    private final String fastApiUrl;

    public PredictionService(@Value("${ml.fastapi.url:http://localhost:8000/predict}") String fastApiUrl) {
        this.restTemplate = new RestTemplate();
        this.fastApiUrl = fastApiUrl;
    }

    public PredictionResponse predict(PredictionRequest request) {
        // Map Spring Boot PredictionRequest (camelCase) to FastApiPredictionRequest (snake_case)
        String collegeTierStr = "Tier 1";
        if (request.getCollegeTier() != null) {
            collegeTierStr = "Tier " + request.getCollegeTier();
        }

        FastApiPredictionRequest fastApiRequest = FastApiPredictionRequest.builder()
                .age(request.getAge())
                .gender(request.getGender())
                .cgpa(request.getCgpa())
                .branch(request.getBranch())
                .college_tier(collegeTierStr)
                .internships_count(request.getInternshipsCount())
                .projects_count(request.getProjectsCount())
                .certifications_count(request.getCertificationsCount())
                .coding_skill_score(request.getCodingSkillScore())
                .communication_skill_score(request.getCommunicationSkillScore())
                .aptitude_score(request.getAptitudeScore())
                .logical_reasoning_score(request.getLogicalReasoningScore())
                .mock_interview_score(request.getMockInterviewScore())
                .backlogs(request.getBacklogs())
                .build();

        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<FastApiPredictionRequest> entity = new HttpEntity<>(fastApiRequest, headers);

            FastApiPredictionResponse fastApiResponse = restTemplate.postForObject(
                    fastApiUrl, entity, FastApiPredictionResponse.class
            );

            if (fastApiResponse != null) {
                return PredictionResponse.builder()
                        .prediction(fastApiResponse.getPrediction())
                        .confidence(fastApiResponse.getConfidence())
                        .message(fastApiResponse.getMessage())
                        .build();
            } else {
                throw new RuntimeException("Received empty response from ML FastAPI service.");
            }
        } catch (RestClientException ex) {
            throw new RuntimeException("Failed to communicate with ML FastAPI prediction service at " + fastApiUrl + ": " + ex.getMessage(), ex);
        }
    }
}
