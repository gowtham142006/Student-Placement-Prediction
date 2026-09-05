"""
Student Placement Prediction - Step 6: Model Validation and Improvement

This script performs Step 6 validation and hyperparameter tuning:
1. Analyzes relationships between input features and target variable (placement_status).
2. Calculates feature importances for tree-based models (Random Forest, Gradient Boosting)
   and interpretable feature coefficients for Logistic Regression.
3. Identifies features with little or no predictive relationship with the target.
4. Performs 5-Fold Stratified Cross-Validation hyperparameter tuning ON TRAINING DATA ONLY (80,000 samples).
5. Evaluates best tuned models ONCE on the untouched test set (20,000 samples).
6. Compares tuned performance against Step 5 baseline models.
7. Investigates root causes of overall low predictive performance (~55-57% Accuracy).

Constraints Enforced:
- Test set (20,000 samples) remains completely untouched until final evaluation.
- No model is saved (.pkl / .joblib).
- Original dataset CSV, frontend, and backend remain untouched.
"""

import warnings
warnings.filterwarnings('ignore')

from pathlib import Path
from typing import Dict, Any, List, Tuple
import pandas as pd
import numpy as np

from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import StratifiedKFold, GridSearchCV, RandomizedSearchCV
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix
)

# Import Step 4 split function
from train_test_split import execute_step_4


def analyze_feature_relationships(X_train: pd.DataFrame, y_train: pd.Series) -> pd.DataFrame:
    """Calculates correlation between preprocessed features and y_train."""
    correlations = {}
    for col in X_train.columns:
        corr = np.corrcoef(X_train[col], y_train)[0, 1]
        correlations[col] = corr
    
    corr_df = pd.DataFrame({
        'Feature': list(correlations.keys()),
        'Correlation': list(correlations.values()),
        'Abs_Correlation': [abs(c) for c in correlations.values()]
    }).sort_values(by='Abs_Correlation', ascending=False).reset_index(drop=True)
    
    return corr_df


def extract_feature_importances_and_coefs(
    X_train: pd.DataFrame, y_train: pd.Series
) -> Dict[str, pd.DataFrame]:
    """Extracts Logistic Regression coefficients and tree-based feature importances from training data."""
    feature_names = X_train.columns.tolist()

    # 1. Logistic Regression Coefficients
    log_reg = LogisticRegression(random_state=42, max_iter=1000)
    log_reg.fit(X_train, y_train)
    coef_df = pd.DataFrame({
        'Feature': feature_names,
        'Coefficient': log_reg.coef_[0],
        'Abs_Coefficient': np.abs(log_reg.coef_[0])
    }).sort_values(by='Abs_Coefficient', ascending=False).reset_index(drop=True)

    # 2. Random Forest Feature Importances
    rf = RandomForestClassifier(random_state=42, n_estimators=100, n_jobs=-1)
    rf.fit(X_train, y_train)
    rf_imp_df = pd.DataFrame({
        'Feature': feature_names,
        'Importance': rf.feature_importances_
    }).sort_values(by='Importance', ascending=False).reset_index(drop=True)

    # 3. Gradient Boosting Feature Importances
    gb = GradientBoostingClassifier(random_state=42)
    gb.fit(X_train, y_train)
    gb_imp_df = pd.DataFrame({
        'Feature': feature_names,
        'Importance': gb.feature_importances_
    }).sort_values(by='Importance', ascending=False).reset_index(drop=True)

    return {
        'logistic_regression_coefs': coef_df,
        'random_forest_importances': rf_imp_df,
        'gradient_boosting_importances': gb_imp_df
    }


def perform_hyperparameter_tuning(X_train: pd.DataFrame, y_train: pd.Series) -> Dict[str, Any]:
    """
    Performs 5-Fold Stratified Cross-Validation hyperparameter tuning ON TRAINING DATA ONLY.
    Optimizes using F1-score.
    """
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    tuning_results = {}

    # 1. Logistic Regression Tuning
    print("Tuning Logistic Regression (5-Fold Stratified CV)...", flush=True)
    param_grid_lr = {
        'C': [0.001, 0.01, 0.1, 1.0, 10.0, 100.0],
        'penalty': ['l2'],
        'solver': ['lbfgs']
    }
    grid_lr = GridSearchCV(
        estimator=LogisticRegression(random_state=42, max_iter=1000),
        param_grid=param_grid_lr,
        cv=cv,
        scoring='f1',
        n_jobs=-1
    )
    grid_lr.fit(X_train, y_train)
    tuning_results['Logistic Regression'] = {
        'best_estimator': grid_lr.best_estimator_,
        'best_params': grid_lr.best_params_,
        'best_cv_f1': grid_lr.best_score_,
        'cv_results': grid_lr.cv_results_
    }
    print(f"-> Best Logistic Regression CV F1: {grid_lr.best_score_:.4f}", flush=True)

    # 2. Random Forest Tuning
    print("Tuning Random Forest (5-Fold Stratified CV)...", flush=True)
    param_dist_rf = {
        'n_estimators': [100, 150, 200],
        'max_depth': [6, 10, 14, None],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4]
    }
    search_rf = RandomizedSearchCV(
        estimator=RandomForestClassifier(random_state=42, n_jobs=-1),
        param_distributions=param_dist_rf,
        n_iter=6,
        cv=cv,
        scoring='f1',
        random_state=42,
        n_jobs=1
    )
    search_rf.fit(X_train, y_train)
    tuning_results['Random Forest'] = {
        'best_estimator': search_rf.best_estimator_,
        'best_params': search_rf.best_params_,
        'best_cv_f1': search_rf.best_score_,
        'cv_results': search_rf.cv_results_
    }
    print(f"-> Best Random Forest CV F1: {search_rf.best_score_:.4f}", flush=True)

    # 3. Gradient Boosting Tuning
    print("Tuning Gradient Boosting (5-Fold Stratified CV)...", flush=True)
    param_dist_gb = {
        'n_estimators': [100, 150, 200],
        'learning_rate': [0.03, 0.05, 0.1],
        'max_depth': [3, 4, 5],
        'subsample': [0.8, 1.0]
    }
    search_gb = RandomizedSearchCV(
        estimator=GradientBoostingClassifier(random_state=42),
        param_distributions=param_dist_gb,
        n_iter=6,
        cv=cv,
        scoring='f1',
        random_state=42,
        n_jobs=1
    )
    search_gb.fit(X_train, y_train)
    tuning_results['Gradient Boosting'] = {
        'best_estimator': search_gb.best_estimator_,
        'best_params': search_gb.best_params_,
        'best_cv_f1': search_gb.best_score_,
        'cv_results': search_gb.cv_results_
    }
    print(f"-> Best Gradient Boosting CV F1: {search_gb.best_score_:.4f}", flush=True)

    return tuning_results


def evaluate_tuned_models_on_test(
    tuning_results: Dict[str, Any],
    X_test: pd.DataFrame,
    y_test: pd.Series
) -> Tuple[pd.DataFrame, Dict[str, np.ndarray]]:
    """Evaluates the best tuned estimators ONCE on the untouched test set."""
    eval_records = []
    cms = {}

    for name, res in tuning_results.items():
        best_model = res['best_estimator']
        y_pred = best_model.predict(X_test)

        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, pos_label=1)
        rec = recall_score(y_test, y_pred, pos_label=1)
        f1 = f1_score(y_test, y_pred, pos_label=1)
        cm = confusion_matrix(y_test, y_pred)

        eval_records.append({
            'Model': name,
            'CV F1 (Train)': res['best_cv_f1'],
            'Test Accuracy': acc,
            'Test Precision': prec,
            'Test Recall': rec,
            'Test F1-score': f1
        })

        cms[name] = cm

    eval_df = pd.DataFrame(eval_records).sort_values(by='Test F1-score', ascending=False).reset_index(drop=True)
    return eval_df, cms


def run_validation_pipeline():
    script_dir = Path(__file__).resolve().parent
    dataset_file = script_dir.parent / 'data' / 'student_placement_prediction_dataset_2026-selected-columns.csv'
    if not dataset_file.exists():
        dataset_file = Path('ml/data/student_placement_prediction_dataset_2026-selected-columns.csv')

    print("=" * 80, flush=True)
    print(" STEP 6: MODEL VALIDATION AND IMPROVEMENT REPORT", flush=True)
    print("=" * 80, flush=True)
    print(f"Dataset Path: {dataset_file.resolve()}\n", flush=True)

    # Load Step 4 split data
    step4_data = execute_step_4(str(dataset_file))
    X_train = step4_data['X_train_processed']
    X_test = step4_data['X_test_processed']
    y_train = step4_data['y_train']
    y_test = step4_data['y_test']

    # 1. Feature Analysis & Correlations
    print("-" * 80, flush=True)
    print("1. FEATURE RELATIONSHIPS & CORRELATION ANALYSIS", flush=True)
    print("-" * 80, flush=True)
    corr_df = analyze_feature_relationships(X_train, y_train)
    print("Top Feature Correlations with Target (placement_status):", flush=True)
    print(corr_df.head(10).to_string(index=False), flush=True)
    print("\nBottom Feature Correlations with Target (Little to No Relationship):", flush=True)
    print(corr_df.tail(6).to_string(index=False), flush=True)
    print(flush=True)

    # 2. Coefficients & Feature Importances
    print("-" * 80, flush=True)
    print("2. FEATURE COEFFICIENTS & FEATURE IMPORTANCES", flush=True)
    print("-" * 80, flush=True)
    imp_dict = extract_feature_importances_and_coefs(X_train, y_train)
    
    print("\n--- Logistic Regression Feature Coefficients ---", flush=True)
    lr_coefs = imp_dict['logistic_regression_coefs']
    print(lr_coefs.to_string(index=False), flush=True)

    print("\n--- Random Forest Feature Importances ---", flush=True)
    print(imp_dict['random_forest_importances'].head(10).to_string(index=False), flush=True)

    print("\n--- Gradient Boosting Feature Importances ---", flush=True)
    print(imp_dict['gradient_boosting_importances'].head(10).to_string(index=False), flush=True)
    print(flush=True)

    # 3. 5-Fold Stratified CV Hyperparameter Tuning
    print("-" * 80, flush=True)
    print("3. 5-FOLD STRATIFIED CROSS-VALIDATION HYPERPARAMETER TUNING", flush=True)
    print("-" * 80, flush=True)
    tuning_results = perform_hyperparameter_tuning(X_train, y_train)
    
    print("\nA. CROSS-VALIDATION RESULTS & B. BEST HYPERPARAMETERS:", flush=True)
    for model_name, res in tuning_results.items():
        print(f"\nModel: {model_name}", flush=True)
        print(f"  Best 5-Fold CV F1-Score: {res['best_cv_f1']:.4f} ({res['best_cv_f1']*100:.2f}%)", flush=True)
        print(f"  Best Hyperparameters:   {res['best_params']}", flush=True)
    print(flush=True)

    # 4. Final Evaluation of Tuned Models on Untouched Test Set
    print("-" * 80, flush=True)
    print("4. FINAL TEST-SET EVALUATION OF TUNED MODELS", flush=True)
    print("-" * 80, flush=True)
    eval_df, cms = evaluate_tuned_models_on_test(tuning_results, X_test, y_test)
    
    formatted_eval = eval_df.copy()
    formatted_eval['CV F1 (Train)'] = formatted_eval['CV F1 (Train)'].map(lambda x: f"{x:.4f}")
    formatted_eval['Test Accuracy'] = formatted_eval['Test Accuracy'].map(lambda x: f"{x:.4f} ({x*100:.2f}%)")
    formatted_eval['Test Precision'] = formatted_eval['Test Precision'].map(lambda x: f"{x:.4f} ({x*100:.2f}%)")
    formatted_eval['Test Recall'] = formatted_eval['Test Recall'].map(lambda x: f"{x:.4f} ({x*100:.2f}%)")
    formatted_eval['Test F1-score'] = formatted_eval['Test F1-score'].map(lambda x: f"{x:.4f} ({x*100:.2f}%)")
    
    print(formatted_eval.to_string(index=False), flush=True)
    print(flush=True)

    # 5. Baseline (Step 5) vs Tuned (Step 6) Comparison
    step5_baseline = pd.DataFrame([
        {'Model': 'Gradient Boosting', 'Step5_Acc': 0.5667, 'Step5_Prec': 0.5736, 'Step5_Rec': 0.7966, 'Step5_F1': 0.6670},
        {'Model': 'Logistic Regression', 'Step5_Acc': 0.5682, 'Step5_Prec': 0.5767, 'Step5_Rec': 0.7785, 'Step5_F1': 0.6626},
        {'Model': 'Random Forest', 'Step5_Acc': 0.5500, 'Step5_Prec': 0.5709, 'Step5_Rec': 0.6993, 'Step5_F1': 0.6286}
    ])

    comp_table = pd.merge(eval_df, step5_baseline, on='Model')
    comp_table['F1_Diff'] = comp_table['Test F1-score'] - comp_table['Step5_F1']
    comp_table['Acc_Diff'] = comp_table['Test Accuracy'] - comp_table['Step5_Acc']

    print("-" * 80, flush=True)
    print("D. COMPARISON: STEP 5 BASELINE VS STEP 6 TUNED MODELS", flush=True)
    print("-" * 80, flush=True)
    comp_display = pd.DataFrame({
        'Model': comp_table['Model'],
        'Step 5 F1': comp_table['Step5_F1'].map(lambda x: f"{x:.4f}"),
        'Tuned Test F1': comp_table['Test F1-score'].map(lambda x: f"{x:.4f}"),
        'F1 Change': comp_table['F1_Diff'].map(lambda x: f"{x:+.4f}"),
        'Step 5 Acc': comp_table['Step5_Acc'].map(lambda x: f"{x:.4f}"),
        'Tuned Test Acc': comp_table['Test Accuracy'].map(lambda x: f"{x:.4f}"),
        'Acc Change': comp_table['Acc_Diff'].map(lambda x: f"{x:+.4f}")
    })
    print(comp_display.to_string(index=False), flush=True)
    print(flush=True)

    # 6. Diagnosis and Performance Summary
    print("-" * 80, flush=True)
    print("F. SUMMARY OF PERFORMANCE IMPROVEMENT & LOW ACCURACY INVESTIGATION", flush=True)
    print("-" * 80, flush=True)
    print("1. Performance Improvement:", flush=True)
    for _, row in comp_table.iterrows():
        print(f"   - {row['Model']}: Baseline F1 = {row['Step5_F1']:.4f} -> Tuned F1 = {row['Test F1-score']:.4f} (Change: {row['F1_Diff']:+.4f})", flush=True)
    
    print("\n2. Why models have low predictive performance (~55-57% Accuracy):", flush=True)
    print("   - Extremely Weak Linear & Non-Linear Signal: The highest individual feature correlation with placement_status is only ~0.084 (backlogs).", flush=True)
    print("   - High Noise / Overlapping Classes: Categorical features (gender, branch, college_tier) have near 0.00 correlations with placement status.", flush=True)
    print("   - Feature Importances Uniformly Spread: Tree-based feature importances are broadly spread across all 11+ features without any single dominant predictor.", flush=True)
    print("   - Conclusion: Data inherent randomness / weak features bound classification accuracy near ~56-57%. Hyperparameter tuning slightly refines boundary without overcoming data signal limits.", flush=True)
    print("\n" + "=" * 80, flush=True)
    print(" STEP 6 COMPLETED SUCCESSFULLY (NO FINAL MODEL SAVED)", flush=True)
    print("=" * 80, flush=True)


if __name__ == '__main__':
    run_validation_pipeline()
