package com.studentplacement.backend.service;

import com.studentplacement.backend.dto.PredictionRequest;
import com.studentplacement.backend.dto.PredictionResponse;
import org.springframework.stereotype.Service;

@Service
public class PredictionService {

    public PredictionResponse predict(PredictionRequest request) {
        // TODO: Replace with actual ML model integration
        return PredictionResponse.builder()
                .prediction(true)
                .confidence(95.5)
                .message("Likely to be placed")
                .build();
    }
}
