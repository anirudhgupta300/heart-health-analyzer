import os
import pandas as pd

CSV_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "HeartDisease.csv")

def load_clean_data():
    if not os.path.exists(CSV_PATH):
        raise FileNotFoundError(f"Dataset not found at {CSV_PATH}")

    df = pd.read_csv(CSV_PATH)

    bad_rows = df[
        (df['trestbps'] < 50) |
        (df['trestbps'].isna()) |
        (df['chol'] < 50) |
        (df['chol'].isna())
    ].index

    df_clean = df.drop(bad_rows)
    df_clean = df_clean.copy()
    df_clean['target'] = (df_clean['num'] > 0).astype(int)
    return df_clean


if __name__ == "__main__":
    df = load_clean_data()
    print(df.head(2))
    print("\nDataset info:")
    print(df.info())
    print("\nStatistical summary:")
    print(df.describe())
    zero_bp_count = (df['trestbps'] == 0).sum()
    print(f"Patients with 0 blood pressure: {zero_bp_count}")
