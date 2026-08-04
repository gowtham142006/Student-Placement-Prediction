package com.studentplacement.backend.controller;

import com.studentplacement.backend.dto.PredictionRequest;
import com.studentplacement.backend.dto.PredictionResponse;
import com.studentplacement.backend.service.PredictionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PredictionController {

    private final PredictionService predictionService;

    public PredictionController(PredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @PostMapping("/predict")
    public ResponseEntity<PredictionResponse> predict(@RequestBody PredictionRequest request) {
        PredictionResponse response = predictionService.predict(request);
        return ResponseEntity.ok(response);
    }
}
