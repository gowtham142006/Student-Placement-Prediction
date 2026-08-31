import pandas as pd

DATASET_PATH = "ml/data/student_placement_prediction_dataset_2026-selected-columns.csv"

df = pd.read_csv(DATASET_PATH)

print("\n========== DATASET SHAPE ==========")
print("Rows:", df.shape[0])
print("Columns:", df.shape[1])

print("\n========== COLUMNS ==========")
for column in df.columns:
    print(column)

print("\n========== DATA TYPES ==========")
print(df.dtypes)

print("\n========== MISSING VALUES ==========")
print(df.isnull().sum())

print("\n========== DUPLICATES ==========")
print("Duplicate rows:", df.duplicated().sum())

print("\n========== CATEGORICAL VALUES ==========")

for column in ["gender", "branch", "college_tier"]:
    print(f"\n{column}:")
    print(df[column].value_counts())

print("\n========== TARGET ==========")
print(df["placement_status"].value_counts())

print("\n========== TARGET PERCENTAGE ==========")
print(df["placement_status"].value_counts(normalize=True) * 100)

print("\n========== NUMERICAL SUMMARY ==========")
print(df.describe())