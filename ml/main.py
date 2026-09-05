"""
Student Placement Prediction - Python ML Prediction API (FastAPI)

This module provides the HTTP API for student placement predictions using the
saved scikit-learn pipeline (placement_prediction_pipeline.joblib).
"""

from contextlib import asynccontextmanager
from pathlib import Path
from typing import Dict, Any
import joblib
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# Define global pipeline container to ensure model is loaded ONCE on startup
class ModelContainer:
    pipeline: Any = None


model_container = ModelContainer()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan event handler to load joblib model pipeline once on app startup."""
    model_path = Path(__file__).resolve().parent / "models" / "placement_prediction_pipeline.joblib"
    if not model_path.exists():
        # Fallback path if run from root directory
        model_path = Path("ml/models/placement_prediction_pipeline.joblib")
    
    if not model_path.exists():
        raise FileNotFoundError(f"Saved model pipeline not found at: {model_path.resolve()}")
    
    print(f"Loading ML pipeline from: {model_path.resolve()}...")
    model_container.pipeline = joblib.load(model_path)
    print("ML pipeline loaded successfully!")
    yield
    # Clean up on shutdown if needed
    model_container.pipeline = None


app = FastAPI(
    title="Student Placement Prediction ML API",
    description="Python FastAPI service serving the Student Placement Prediction ML Pipeline",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:8080",
        "http://127.0.0.1:8080",
        "http://localhost:3000",
        "http://127.0.0.1:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class StudentPredictionRequest(BaseModel):
    age: int = Field(..., example=22)
    gender: str = Field(..., example="Male")
    cgpa: float = Field(..., example=8.5)
    branch: str = Field(..., example="Computer Science")
    college_tier: str = Field(..., example="Tier 1")
    internships_count: int = Field(..., example=2)
    projects_count: int = Field(..., example=3)
    certifications_count: int = Field(..., example=2)
    coding_skill_score: float = Field(..., example=85.0)
    aptitude_score: float = Field(..., example=80.0)
    communication_skill_score: float = Field(..., example=78.0)
    logical_reasoning_score: float = Field(..., example=82.0)
    mock_interview_score: float = Field(..., example=88.0)
    backlogs: int = Field(..., example=0)


class PredictionResponse(BaseModel):
    prediction: bool
    confidence: float
    message: str


@app.get("/health")
def health_check():
    """Health check endpoint."""
    return {"status": "ok"}


@app.post("/predict", response_model=PredictionResponse)
def predict_placement(request: StudentPredictionRequest):
    """
    Accepts raw student input data (14 fields), converts to pandas DataFrame,
    runs prediction through loaded ML pipeline, and returns prediction result and confidence score.
    """
    if model_container.pipeline is None:
        raise HTTPException(status_code=500, detail="ML model pipeline is not loaded.")
    
    try:
        # Convert request data into single-row DataFrame matching the 14 raw feature names
        input_data = request.model_dump()
        input_df = pd.DataFrame([input_data])
        
        # Run prediction and probability via pipeline
        pred_class = int(model_container.pipeline.predict(input_df)[0])
        pred_probas = model_container.pipeline.predict_proba(input_df)[0]
        
        # Calculate boolean prediction and confidence score for the predicted class
        is_placed = bool(pred_class == 1)
        confidence = float(pred_probas[1] if is_placed else pred_probas[0])
        confidence = round(confidence, 4)
        
        if is_placed:
            message = "Student is predicted to be placed"
        else:
            message = "Student is predicted to be not placed"
            
        return PredictionResponse(
            prediction=is_placed,
            confidence=confidence,
            message=message
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Prediction error: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=False)
