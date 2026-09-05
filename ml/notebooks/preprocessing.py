"""
Student Placement Prediction - Data Preprocessing Module

This module defines the scikit-learn preprocessing pipeline for the Student Placement Prediction project.
Features:
- Encodes target variable ('placement_status': 'Placed' -> 1, 'Not Placed' -> 0)
- One-Hot Encoders categorical input columns ('gender', 'branch', 'college_tier')
- Keeps numerical columns as numerical values
- Combines preprocessing using ColumnTransformer
- Ensures strict train/test splitting prior to fitting preprocessor to eliminate data leakage
"""

from pathlib import Path
from typing import Tuple, List, Dict, Any
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.model_selection import train_test_split

# Define column groups
TARGET_COL = 'placement_status'
TARGET_MAPPING = {'Placed': 1, 'Not Placed': 0}

CATEGORICAL_COLS = ['gender', 'branch', 'college_tier']

NUMERICAL_COLS = [
    'age',
    'cgpa',
    'internships_count',
    'projects_count',
    'certifications_count',
    'coding_skill_score',
    'aptitude_score',
    'communication_skill_score',
    'logical_reasoning_score',
    'mock_interview_score',
    'backlogs'
]


def create_preprocessor() -> ColumnTransformer:
    """
    Creates and returns an unfitted scikit-learn ColumnTransformer pipeline.
    
    - OneHotEncoder applied to categorical columns (gender, branch, college_tier)
    - 'passthrough' applied to numerical columns
    """
    preprocessor = ColumnTransformer(
        transformers=[
            ('num', 'passthrough', NUMERICAL_COLS),
            ('cat', OneHotEncoder(handle_unknown='ignore', sparse_output=False), CATEGORICAL_COLS)
        ],
        verbose_feature_names_out=False
    )
    return preprocessor


def load_and_preprocess_data(
    data_path: str,
    test_size: float = 0.2,
    random_state: int = 42
) -> Tuple[pd.DataFrame, pd.DataFrame, pd.Series, pd.Series, ColumnTransformer, List[str]]:
    """
    Loads raw CSV, encodes target variable, performs train-test split FIRST, 
    and then fits preprocessing pipeline strictly on training data to prevent data leakage.
    
    Returns:
        X_train_df: Preprocessed training features DataFrame
        X_test_df: Preprocessed test features DataFrame
        y_train: Binary encoded target series for training
        y_test: Binary encoded target series for testing
        preprocessor: Fitted ColumnTransformer
        feature_names: List of feature names after one-hot encoding
    """
    file_path = Path(data_path)
    if not file_path.exists():
        raise FileNotFoundError(f"Dataset file not found at: {file_path.resolve()}")

    # 1. Load dataset
    df = pd.read_csv(file_path)

    # 2. Separate target column from input features
    if TARGET_COL not in df.columns:
        raise KeyError(f"Target column '{TARGET_COL}' not found in dataset.")

    X = df.drop(columns=[TARGET_COL])
    y_raw = df[TARGET_COL]

    # 3. Convert target into binary (Placed -> 1, Not Placed -> 0)
    y = y_raw.map(TARGET_MAPPING)
    if y.isnull().any():
        raise ValueError(f"Found unmapped values in target column '{TARGET_COL}'. Expected keys: {list(TARGET_MAPPING.keys())}")
    
    y = y.astype(int)

    # 4. PREVENT DATA LEAKAGE: Perform train/test split BEFORE fitting preprocessor
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=test_size, random_state=random_state, stratify=y
    )

    # 5. Fit preprocessing pipeline on training set ONLY
    preprocessor = create_preprocessor()
    X_train_transformed = preprocessor.fit_transform(X_train)

    # 6. Transform test set using fitted preprocessor (NO FIT on test set!)
    X_test_transformed = preprocessor.transform(X_test)

    # Get output feature names
    feature_names = list(preprocessor.get_feature_names_out())

    # Wrap transformed arrays back into clean DataFrames for readability
    X_train_df = pd.DataFrame(X_train_transformed, columns=feature_names, index=X_train.index)
    X_test_df = pd.DataFrame(X_test_transformed, columns=feature_names, index=X_test.index)

    return X_train_df, X_test_df, y_train, y_test, preprocessor, feature_names


def run_demo():
    """Demonstrates and verifies data preprocessing execution."""
    script_dir = Path(__file__).resolve().parent
    dataset_file = script_dir.parent / 'data' / 'student_placement_prediction_dataset_2026-selected-columns.csv'
    if not dataset_file.exists():
        dataset_file = Path('ml/data/student_placement_prediction_dataset_2026-selected-columns.csv')

    print("=" * 80)
    print(" STUDENT PLACEMENT PREDICTION - DATA PREPROCESSING")
    print("=" * 80)
    print(f"Loading raw dataset from: {dataset_file.resolve()}\n")

    X_train_df, X_test_df, y_train, y_test, preprocessor, feature_names = load_and_preprocess_data(str(dataset_file))

    print("-" * 80)
    print("1. TARGET ENCODING CONFIRMATION")
    print("-" * 80)
    print(f"Target column mapping: {TARGET_MAPPING}")
    print(f"Unique values in y_train: {y_train.unique().tolist()}")
    print(f"Unique values in y_test:  {y_test.unique().tolist()}")
    print("y_train distribution:")
    print(y_train.value_counts(normalize=True).to_frame('Percentage (%)') * 100)
    print()

    print("-" * 80)
    print("2. DATA LEAKAGE PREVENTION CONFIRMATION")
    print("-" * 80)
    print("[CONFIRMED] train_test_split performed BEFORE fitting preprocessor.")
    print("  - Preprocessor was fitted ONLY on X_train.")
    print("  - X_test was transformed using preprocessor.transform(X_test) with NO fit call.\n")

    print("-" * 80)
    print("3. TRANSFORMED FEATURE DETAILS")
    print("-" * 80)
    print(f"Number of Transformed Features: {len(feature_names)}")
    print(f"Original Input Features:       {len(NUMERICAL_COLS) + len(CATEGORICAL_COLS)} (Numerical: {len(NUMERICAL_COLS)}, Categorical: {len(CATEGORICAL_COLS)})")
    print("\nList of Transformed Feature Names:")
    for idx, f_name in enumerate(feature_names, start=1):
        print(f"  {idx:2d}. {f_name}")
    print()

    print("-" * 80)
    print("4. PREPROCESSED DATASET SHAPES")
    print("-" * 80)
    print(f"X_train shape: {X_train_df.shape}")
    print(f"y_train shape: {y_train.shape}")
    print(f"X_test shape:  {X_test_df.shape}")
    print(f"y_test shape:  {y_test.shape}\n")

    print("-" * 80)
    print("5. SAMPLE PREPROCESSED DATA (FIRST 3 ROWS OF X_TRAIN)")
    print("-" * 80)
    print(X_train_df.head(3).to_string())
    print("\n" + "=" * 80)
    print(" DATA PREPROCESSING COMPLETED SUCCESSFULLY")
    print("=" * 80)


if __name__ == '__main__':
    run_demo()
