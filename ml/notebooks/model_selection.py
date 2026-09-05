"""
Student Placement Prediction - Step 7: Final Model Selection and Model Saving

This script:
1. Recreates 80/20 stratified train/test split.
2. Recreates preprocessor pipeline (OneHotEncoder for categorical, passthrough for numerical).
3. Builds a unified sklearn Pipeline containing preprocessor + Tuned Gradient Boosting Classifier:
   - n_estimators=150
   - learning_rate=0.05
   - max_depth=3
   - subsample=0.8
   - random_state=42
4. Fits the unified pipeline strictly on raw training data (X_train_raw, y_train).
5. Evaluates the pipeline once on raw test data (X_test_raw, y_test).
6. Saves the fitted unified pipeline to ml/models/placement_prediction_pipeline.joblib.
7. Saves detailed metadata to ml/models/model_metadata.json.
8. Verifies reloading the saved joblib file in a clean session and executing sample inference on raw feature input.
"""

from pathlib import Path
from datetime import datetime
import json
import joblib
import pandas as pd
import numpy as np

from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.pipeline import Pipeline
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix
)

from preprocessing import (
    create_preprocessor,
    TARGET_COL,
    TARGET_MAPPING,
    CATEGORICAL_COLS,
    NUMERICAL_COLS
)


def build_train_and_save_final_model(data_path: str, output_dir: str):
    data_file = Path(data_path)
    if not data_file.exists():
        raise FileNotFoundError(f"Dataset not found at: {data_file.resolve()}")

    out_path = Path(output_dir)
    out_path.mkdir(parents=True, exist_ok=True)

    # 1. Load dataset
    df = pd.read_csv(data_file)

    # 2. Separate raw features and target
    X_raw = df.drop(columns=[TARGET_COL])
    y_raw = df[TARGET_COL]
    y = y_raw.map(TARGET_MAPPING).astype(int)

    # 3. Perform 80/20 stratified train/test split (random_state=42)
    X_train_raw, X_test_raw, y_train, y_test = train_test_split(
        X_raw, y, test_size=0.20, random_state=42, stratify=y
    )

    # 4. Create Preprocessor and Classifier
    preprocessor = create_preprocessor()
    classifier = GradientBoostingClassifier(
        n_estimators=150,
        learning_rate=0.05,
        max_depth=3,
        subsample=0.8,
        random_state=42
    )

    # 5. Create Unified Pipeline (Preprocessing + Model)
    pipeline = Pipeline([
        ('preprocessor', preprocessor),
        ('classifier', classifier)
    ])

    print("Fitting unified pipeline on training data...", flush=True)
    pipeline.fit(X_train_raw, y_train)

    # 6. Evaluate ONCE on untouched test set
    y_pred = pipeline.predict(X_test_raw)

    acc = float(accuracy_score(y_test, y_pred))
    prec = float(precision_score(y_test, y_pred, pos_label=1))
    rec = float(recall_score(y_test, y_pred, pos_label=1))
    f1 = float(f1_score(y_test, y_pred, pos_label=1))
    cm = confusion_matrix(y_test, y_pred).tolist()

    print(f"Test Accuracy:  {acc:.4f}")
    print(f"Test Precision: {prec:.4f}")
    print(f"Test Recall:    {rec:.4f}")
    print(f"Test F1-score:  {f1:.4f}")

    # 7. Save complete pipeline with joblib
    pipeline_filename = out_path / 'placement_prediction_pipeline.joblib'
    joblib.dump(pipeline, pipeline_filename)
    print(f"Pipeline successfully saved to: {pipeline_filename.resolve()}")

    # 8. Save Model Metadata
    raw_feature_names = list(X_raw.columns)
    metadata = {
        "model_name": "Tuned Gradient Boosting Classifier",
        "model_type": "GradientBoostingClassifier",
        "target_column": TARGET_COL,
        "target_mapping": TARGET_MAPPING,
        "raw_input_feature_names": raw_feature_names,
        "categorical_features": CATEGORICAL_COLS,
        "numerical_features": NUMERICAL_COLS,
        "preprocessing_method": "ColumnTransformer (OneHotEncoder for categorical, passthrough for numerical)",
        "train_test_split": {
            "test_size": 0.20,
            "random_state": 42,
            "stratified": True,
            "train_samples": len(X_train_raw),
            "test_samples": len(X_test_raw)
        },
        "model_hyperparameters": {
            "n_estimators": 150,
            "learning_rate": 0.05,
            "max_depth": 3,
            "subsample": 0.8,
            "random_state": 42
        },
        "final_test_metrics": {
            "accuracy": round(acc, 4),
            "precision": round(prec, 4),
            "recall": round(rec, 4),
            "f1_score": round(f1, 4),
            "confusion_matrix": cm
        },
        "creation_date": datetime.now().isoformat()
    }

    metadata_filename = out_path / 'model_metadata.json'
    with open(metadata_filename, 'w') as f:
        json.dump(metadata, f, indent=4)
    print(f"Metadata successfully saved to: {metadata_filename.resolve()}")

    return pipeline_filename, metadata_filename, metadata, pipeline, X_test_raw, y_test


def verify_saved_pipeline(pipeline_path: Path):
    print("\n" + "=" * 80)
    print(" VERIFYING SAVED JOBLIB PIPELINE RE-LOADING & SAMPLE INFERENCE")
    print("=" * 80)
    
    # Reload in clean session
    loaded_pipeline = joblib.load(pipeline_path)
    print(f"[SUCCESS] Loaded pipeline from: {pipeline_path.resolve()}")

    # Define sample raw input dictionary containing all 14 expected features
    sample_raw_dict = {
        'gender': 'Male',
        'branch': 'Computer Science',
        'college_tier': 'Tier 1',
        'age': 22,
        'cgpa': 8.5,
        'internships_count': 2,
        'projects_count': 3,
        'certifications_count': 2,
        'coding_skill_score': 85,
        'aptitude_score': 80,
        'communication_skill_score': 78,
        'logical_reasoning_score': 82,
        'mock_interview_score': 88,
        'backlogs': 0
    }

    sample_df = pd.DataFrame([sample_raw_dict])
    
    # Predict using loaded pipeline
    pred_class = int(loaded_pipeline.predict(sample_df)[0])
    pred_probas = loaded_pipeline.predict_proba(sample_df)[0]
    prob_placed = float(pred_probas[1])
    prob_not_placed = float(pred_probas[0])

    status_label = "Placed" if pred_class == 1 else "Not Placed"

    print("\nSample Raw Input:")
    for k, v in sample_raw_dict.items():
        print(f"  {k}: {v}")
    
    print("\nPrediction Results:")
    print(f"  Predicted Class: {pred_class} ({status_label})")
    print(f"  Probability [Not Placed (0)]: {prob_not_placed:.4f} ({prob_not_placed*100:.2f}%)")
    print(f"  Probability [Placed (1)]:     {prob_placed:.4f} ({prob_placed*100:.2f}%)")
    print("\n[CONFIRMED] Preprocessing + Model are fully integrated into the saved pipeline.")


def main():
    script_dir = Path(__file__).resolve().parent
    dataset_file = script_dir.parent / 'data' / 'student_placement_prediction_dataset_2026-selected-columns.csv'
    if not dataset_file.exists():
        dataset_file = Path('ml/data/student_placement_prediction_dataset_2026-selected-columns.csv')

    models_dir = script_dir.parent / 'models'

    pipeline_path, meta_path, meta_data, pipeline, X_test, y_test = build_train_and_save_final_model(
        str(dataset_file), str(models_dir)
    )

    verify_saved_pipeline(pipeline_path)


if __name__ == '__main__':
    main()
