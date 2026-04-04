import os
import joblib
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

MODEL_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "heart_model.pkl")
ENCODERS_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "heart_encoders.pkl")

CATEGORICAL_COLUMNS = ['sex', 'cp', 'restecg', 'slope', 'thal', 'dataset']

def Train_model(df):
    X = df.drop(['num', 'target'], axis=1)
    Y = df['target']

    X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

    # Encode categorical columns — save encoders for prediction use
    encoders = {}
    for col in CATEGORICAL_COLUMNS:
        if col not in X_train.columns:
            continue
        le = LabelEncoder()
        X_train = X_train.copy()
        X_test = X_test.copy()
        X_train[col] = le.fit_transform(X_train[col].astype(str))
        # Handle unseen labels in test set gracefully
        X_test[col] = X_test[col].astype(str).map(
            lambda val, le=le: le.transform([val])[0] if val in le.classes_ else -1
        )
        encoders[col] = le

    model = RandomForestClassifier(n_estimators=100, random_state=42)
    model.fit(X_train, Y_train)

    predictions = model.predict(X_test)
    accuracy = accuracy_score(Y_test, predictions)
    print(f"Model trained. Accuracy on test set: {accuracy:.4f}")

    joblib.dump(model, MODEL_PATH)
    joblib.dump(encoders, ENCODERS_PATH)
    print(f"Model saved to {MODEL_PATH}")
    print(f"Encoders saved to {ENCODERS_PATH}")

    return X_test, Y_test, model, encoders


if __name__ == "__main__":
    from Data_cleaning import load_clean_data
    df = load_clean_data()
    X_test, Y_test, model, encoders = Train_model(df)
    print("Training complete.")
