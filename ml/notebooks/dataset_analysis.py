"""
Student Placement Prediction - Dataset Exploratory Data Analysis (EDA)

This script performs dataset analysis on the student placement dataset.
Dataset: ml/data/student_placement_prediction_dataset_2026-selected-columns.csv
Target Column: placement_status
"""

import os
from pathlib import Path
import pandas as pd


def analyze_dataset(data_path: str):
    # Resolve path relative to script or project root
    file_path = Path(data_path)
    if not file_path.exists():
        raise FileNotFoundError(f"Dataset file not found at: {file_path.resolve()}")

    print("=" * 80)
    print(" STUDENT PLACEMENT PREDICTION - DATASET ANALYSIS REPORT")
    print("=" * 80)
    print(f"Dataset Path: {file_path.resolve()}\n")

    # Load dataset
    df = pd.read_csv(file_path)

    # 1. Number of rows and columns
    num_rows, num_cols = df.shape
    print("-" * 80)
    print("1. DATASET SHAPE")
    print("-" * 80)
    print(f"Number of Rows:    {num_rows:,}")
    print(f"Number of Columns: {num_cols}\n")

    # 2. All column names
    print("-" * 80)
    print("2. COLUMN NAMES")
    print("-" * 80)
    for idx, col in enumerate(df.columns, start=1):
        print(f"  {idx:2d}. {col}")
    print()

    # 3. Data types of every column
    print("-" * 80)
    print("3. DATA TYPES")
    print("-" * 80)
    for col, dtype in df.dtypes.items():
        print(f"  {col:<30}: {dtype}")
    print()

    # 9 & 10. Identify Numerical and Categorical columns
    numerical_cols = df.select_dtypes(include=['number']).columns.tolist()
    categorical_cols = df.select_dtypes(include=['object', 'category', 'string']).columns.tolist()

    print("-" * 80)
    print("9. NUMERICAL COLUMNS LIST")
    print("-" * 80)
    print(f"Count ({len(numerical_cols)}): {numerical_cols}\n")

    print("-" * 80)
    print("10. CATEGORICAL COLUMNS LIST")
    print("-" * 80)
    print(f"Count ({len(categorical_cols)}): {categorical_cols}\n")

    # 4. Missing/null values in every column
    print("-" * 80)
    print("4. MISSING / NULL VALUES")
    print("-" * 80)
    null_counts = df.isnull().sum()
    null_percentages = (null_counts / num_rows) * 100
    missing_df = pd.DataFrame({
        'Missing Count': null_counts,
        'Missing Percentage (%)': null_percentages.round(4)
    })
    print(missing_df.to_string())
    print(f"\nTotal Missing Values across Dataset: {df.isnull().sum().sum()}\n")

    # 5. Number of duplicate rows
    print("-" * 80)
    print("5. DUPLICATE ROWS")
    print("-" * 80)
    num_duplicates = df.duplicated().sum()
    print(f"Number of Duplicate Rows: {num_duplicates} ({(num_duplicates / num_rows) * 100:.2f}%)\n")

    # 6. Unique values of categorical columns
    print("-" * 80)
    print("6. UNIQUE VALUES OF CATEGORICAL COLUMNS")
    print("-" * 80)
    for col in categorical_cols:
        unique_vals = df[col].unique()
        n_unique = df[col].nunique()
        print(f"Column: '{col}' (Total Unique: {n_unique})")
        print(f"  Unique Values: {list(unique_vals)}\n")

    # 7. Count and percentage of each value in placement_status (Target column)
    target_col = 'placement_status'
    print("-" * 80)
    print(f"7. TARGET COLUMN DISTRIBUTION ('{target_col}')")
    print("-" * 80)
    if target_col in df.columns:
        counts = df[target_col].value_counts(dropna=False)
        percentages = df[target_col].value_counts(normalize=True, dropna=False) * 100
        target_summary = pd.DataFrame({
            'Count': counts,
            'Percentage (%)': percentages.round(2)
        })
        print(target_summary.to_string())
    else:
        print(f"Error: Target column '{target_col}' not found in dataset!")
    print()

    # 8. Descriptive statistics for numerical columns
    print("-" * 80)
    print("8. DESCRIPTIVE STATISTICS (NUMERICAL COLUMNS)")
    print("-" * 80)
    if numerical_cols:
        desc_stats = df[numerical_cols].describe().T
        print(desc_stats.to_string())
    print("\n" + "=" * 80)
    print(" END OF ANALYSIS REPORT")
    print("=" * 80)


if __name__ == '__main__':
    script_dir = Path(__file__).resolve().parent
    dataset_file = script_dir.parent / 'data' / 'student_placement_prediction_dataset_2026-selected-columns.csv'
    
    if not dataset_file.exists():
        dataset_file = Path('ml/data/student_placement_prediction_dataset_2026-selected-columns.csv')

    analyze_dataset(str(dataset_file))
