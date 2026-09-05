# Student Placement Prediction - Machine Learning Service

This directory contains the machine learning pipeline, dataset analysis, model training/evaluation scripts, saved joblib model pipeline, and FastAPI HTTP service for the Student Placement Prediction project.

---

## 1. Project Purpose

The primary goal of this ML service is to predict a student's placement status (**Placed** vs. **Not Placed**) along with a prediction confidence score based on academic metrics, technical skills, practical experience, and interview performance indicators.

---

## 2. Dataset Used

* **Dataset Path**: `ml/data/student_placement_prediction_dataset_2026-selected-columns.csv`
* **Dataset Size**: 100,000 student records
* **Target Variable**: `placement_status` (`Placed` = 1, `Not Placed` = 0)

---

## 3. 14 Input Features

The model accepts 14 raw features:

### Categorical Features (3)
* `gender` (e.g., `"Male"`, `"Female"`)
* `branch` (e.g., `"Computer Science"`, `"Information Technology"`, `"Civil Engineering"`, etc.)
* `college_tier` (e.g., `"Tier 1"`, `"Tier 2"`, `"Tier 3"`)

### Numerical Features (11)
* `age` (e.g., `22`)
* `cgpa` (e.g., `8.5`)
* `internships_count` (e.g., `2`)
* `projects_count` (e.g., `3`)
* `certifications_count` (e.g., `2`)
* `coding_skill_score` (e.g., `85.0`)
* `aptitude_score` (e.g., `80.0`)
* `communication_skill_score` (e.g., `78.0`)
* `logical_reasoning_score` (e.g., `82.0`)
* `mock_interview_score` (e.g., `88.0`)
* `backlogs` (e.g., `0`)

---

## 4. Preprocessing Approach

To prevent data leakage and ensure seamless end-to-end inference, preprocessing is encapsulated into a `scikit-learn` `ColumnTransformer`:
* **Categorical Encoding**: `OneHotEncoder(handle_unknown='ignore')` applied to `gender`, `branch`, and `college_tier`.
* **Numerical Features**: Passed through directly (`passthrough`).
* **Pipeline Integration**: The preprocessor is directly combined with the classifier into a single, atomic `sklearn.pipeline.Pipeline`. Raw input DataFrames are passed straight to the pipeline without separate pre-processing steps.

---

## 5. Train / Test Split

* **Split Ratio**: 80% Training (80,000 samples), 20% Testing (20,000 samples)
* **Sampling Method**: Stratified split based on `placement_status` (`random_state=42`)

---

## 6. Models Evaluated

During model exploration and selection (`ml/notebooks/model_training.py`), 4 classification algorithms were evaluated:
1. **Logistic Regression**
2. **Decision Tree Classifier**
3. **Random Forest Classifier**
4. **Gradient Boosting Classifier**

---

## 7. Cross-Validation & Hyperparameter Tuning

5-Fold Stratified Cross-Validation was conducted to optimize model performance. Hyperparameter tuning on the Gradient Boosting Classifier yielded the following optimal parameters:
* `n_estimators`: 150
* `learning_rate`: 0.05
* `max_depth`: 3
* `subsample`: 0.8
* `random_state`: 42

---

## 8. Final Model Selection

**Tuned Gradient Boosting Classifier** (`scikit-learn` `GradientBoostingClassifier`) was selected as the final production model due to achieving the highest overall F1-score across all evaluated models.

---

## 9. Final Test Metrics

Evaluated once on the untouched 20,000 test samples:

* **Accuracy**: **56.69%** (0.5669)
* **Precision**: **57.26%** (0.5726)
* **Recall**: **80.74%** (0.8074)
* **F1-Score**: **67.00%** (0.6700)

---

## 10. Saved Model Pipeline

The complete end-to-end pipeline (Preprocessing + Classifier) is serialized and stored at:
* `ml/models/placement_prediction_pipeline.joblib`

---

## 11. Model Metadata

Detailed training metadata, feature definitions, and test performance figures are logged in:
* `ml/models/model_metadata.json`

---

## 12. FastAPI Service Endpoints

The ML service is implemented using **FastAPI** (`ml/main.py`):

* **`GET /health`**: Health check endpoint.
  * **Response**: `{"status": "ok"}`
* **`POST /predict`**: Accepts student raw JSON input and returns prediction result + confidence.

---

## 13. How to Install Dependencies

Navigate to the workspace root or `ml/` directory and install the required dependencies:

```bash
pip install -r ml/requirements.txt
```

---

## 14. How to Start the FastAPI Service

From the root directory:

```bash
python ml/main.py
```

Or from the `ml` directory using `uvicorn`:

```bash
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

The service will start on `http://localhost:8000`.

---

## 15. Example Prediction Request & Response

### Request (`POST http://localhost:8000/predict`)

```json
{
  "age": 22,
  "gender": "Male",
  "cgpa": 8.5,
  "branch": "Computer Science",
  "college_tier": "Tier 1",
  "internships_count": 2,
  "projects_count": 3,
  "certifications_count": 2,
  "coding_skill_score": 85.0,
  "aptitude_score": 80.0,
  "communication_skill_score": 78.0,
  "logical_reasoning_score": 82.0,
  "mock_interview_score": 88.0,
  "backlogs": 0
}
```

### Response (`HTTP 200 OK`)

```json
{
  "prediction": true,
  "confidence": 0.7619,
  "message": "Student is predicted to be placed"
}
```

---

## 16. Current Model Limitations

* **Moderate Accuracy**: The final model achieves an accuracy of **56.69%** on the test dataset. This reflects significant overlap and noise in the underlying feature space.
* **Recall Preference**: The classifier is tuned toward higher recall (**80.74%**), prioritizing identifying potentially placeable candidates, which results in a higher rate of false positives (Precision **57.26%**).
* **Synthetic / Noisy Feature Boundaries**: Features such as skill scores and academic performance provide probabilistic tendencies rather than deterministic guarantees.
* **Decision Support Only**: Predictions should be used as advisory metrics rather than absolute guarantees of student employment outcomes.
