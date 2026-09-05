"""
Student Placement Prediction - Step 5: Model Training and Evaluation

This script trains and evaluates 4 classification models:
1. Logistic Regression
2. Decision Tree Classifier
3. Random Forest Classifier
4. Gradient Boosting Classifier

All models are trained strictly on X_train_processed and evaluated on X_test_processed.
"""

from pathlib import Path
from typing import Dict, Any, List
import pandas as pd
import numpy as np

from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix
)

# Import Step 4 split function
from train_test_split import execute_step_4


def train_and_evaluate_models(data_path: str) -> Dict[str, Any]:
    # 1. Load split & preprocessed data from Step 4
    step4_data = execute_step_4(data_path)
    
    X_train = step4_data['X_train_processed']
    X_test = step4_data['X_test_processed']
    y_train = step4_data['y_train']
    y_test = step4_data['y_test']

    # 2. Define 4 classification models with random_state=42
    models = {
        'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000),
        'Decision Tree': DecisionTreeClassifier(random_state=42),
        'Random Forest': RandomForestClassifier(random_state=42, n_estimators=100, n_jobs=-1),
        'Gradient Boosting': GradientBoostingClassifier(random_state=42)
    }

    results = []
    confusion_matrices = {}
    trained_models = {}

    for name, model in models.items():
        print(f"Training {name}...")
        # Train ONLY on training set
        model.fit(X_train, y_train)
        
        # Evaluate ONLY on testing set
        y_pred = model.predict(X_test)
        
        # Calculate metrics
        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, pos_label=1)
        rec = recall_score(y_test, y_pred, pos_label=1)
        f1 = f1_score(y_test, y_pred, pos_label=1)
        cm = confusion_matrix(y_test, y_pred)

        results.append({
            'Model': name,
            'Accuracy': acc,
            'Precision': prec,
            'Recall': rec,
            'F1-score': f1
        })

        confusion_matrices[name] = cm
        trained_models[name] = model

    # Convert results into DataFrame and sort by F1-score descending
    results_df = pd.DataFrame(results).sort_values(by='F1-score', ascending=False).reset_index(drop=True)

    return {
        'comparison_df': results_df,
        'confusion_matrices': confusion_matrices,
        'trained_models': trained_models,
        'y_test': y_test
    }


def run_evaluation_report():
    script_dir = Path(__file__).resolve().parent
    dataset_file = script_dir.parent / 'data' / 'student_placement_prediction_dataset_2026-selected-columns.csv'
    if not dataset_file.exists():
        dataset_file = Path('ml/data/student_placement_prediction_dataset_2026-selected-columns.csv')

    print("=" * 80)
    print(" STEP 5: MODEL TRAINING AND EVALUATION REPORT")
    print("=" * 80)
    print(f"Dataset Path: {dataset_file.resolve()}\n")

    eval_data = train_and_evaluate_models(str(dataset_file))
    comparison_df = eval_data['comparison_df']
    cms = eval_data['confusion_matrices']

    # A & B. Individual Metrics & Comparison Table
    print("-" * 80)
    print("A & B. MODEL COMPARISON TABLE (Sorted by F1-Score Descending)")
    print("-" * 80)
    
    # Format metrics as percentages for clear readability
    formatted_df = comparison_df.copy()
    formatted_df['Accuracy'] = formatted_df['Accuracy'].map(lambda x: f"{x:.4f} ({x*100:.2f}%)")
    formatted_df['Precision'] = formatted_df['Precision'].map(lambda x: f"{x:.4f} ({x*100:.2f}%)")
    formatted_df['Recall'] = formatted_df['Recall'].map(lambda x: f"{x:.4f} ({x*100:.2f}%)")
    formatted_df['F1-score'] = formatted_df['F1-score'].map(lambda x: f"{x:.4f} ({x*100:.2f}%)")
    
    print(formatted_df.to_string(index=False))
    print()

    # C. Confusion Matrices
    print("-" * 80)
    print("C. CONFUSION MATRICES (Test Set: 20,000 samples)")
    print("-" * 80)
    for model_name, cm in cms.items():
        tn, fp, fn, tp = cm.ravel()
        print(f"\n--- {model_name} ---")
        print(f"  True Negatives  (TN - Correctly Not Placed): {tn:,}")
        print(f"  False Positives (FP - Incorrectly Placed):   {fp:,}")
        print(f"  False Negatives (FN - Incorrectly Not Placed):{fn:,}")
        print(f"  True Positives  (TP - Correctly Placed):     {tp:,}")
        print(f"  Confusion Matrix Array:\n{cm}")
    print()

    # D. Highest F1-Score Model
    top_model = comparison_df.iloc[0]
    print("-" * 80)
    print("D. HIGHEST F1-SCORE MODEL")
    print("-" * 80)
    print(f"Highest F1-Score Model: {top_model['Model']}")
    print(f"  - F1-Score:  {top_model['F1-score']:.4f} ({top_model['F1-score']*100:.2f}%)")
    print(f"  - Accuracy:  {top_model['Accuracy']:.4f} ({top_model['Accuracy']*100:.2f}%)")
    print(f"  - Precision: {top_model['Precision']:.4f} ({top_model['Precision']*100:.2f}%)")
    print(f"  - Recall:    {top_model['Recall']:.4f} ({top_model['Recall']*100:.2f}%)")

    print("\n" + "=" * 80)
    print(" MODEL TRAINING AND EVALUATION COMPLETED (NO MODEL SAVED)")
    print("=" * 80)


if __name__ == '__main__':
    run_evaluation_report()
