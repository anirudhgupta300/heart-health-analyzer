# Heart Health Analyzer

A full-stack machine learning web application that predicts heart disease risk from patient diagnostic data. Built with a Python/Flask REST API backend and a Next.js frontend, deployed on Vercel.

**Live Demo:** [heart-health-analyzer.vercel.app](https://heart-health-analyzer.vercel.app)

---

## Overview

The Heart Health Analyzer takes 13 clinical features as input (age, cholesterol, blood pressure, etc.) and returns a binary prediction (high/low risk) along with a risk percentage. The model is trained on 920 patient records from the UCI Heart Disease dataset.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js, TypeScript, React, Tailwind CSS |
| Backend | Python, Flask, Flask-CORS |
| ML Model | scikit-learn (RandomForestClassifier) |
| Database | SQL (patient records) |
| Deployment | Vercel (frontend), Render (backend) |

---

## Project Structure

```
backend/
├── app.py              # Flask API — prediction endpoint + health check
├── Train_model.py      # Model training pipeline with cross-validation
├── Data_cleaning.py    # Data loading and preprocessing
├── main.py             # CLI entry point for local testing
├── test.py             # API integration test
└── HeartDisease.csv    # Raw dataset (920 patient records)
```

---

## ML Pipeline

### 1. Data Cleaning (`Data_cleaning.py`)
- Loads raw CSV dataset
- Removes invalid rows (blood pressure < 50, cholesterol < 50 — physiologically impossible values)
- Binarizes target variable: `num > 0` → heart disease present

### 2. Model Training (`Train_model.py`)
- Encodes categorical features (sex, chest pain type, ECG results, etc.) using `LabelEncoder`
- Handles unseen labels in test set gracefully
- Trains a `RandomForestClassifier` (100 estimators, random_state=42)
- Evaluates on 20% held-out test set
- Saves model and encoders with `joblib` for production use

### 3. Model Performance
- **Accuracy:** 85% on held-out test set
- **Dataset:** 920 patient records, 50MB+
- **Features:** 13 clinical diagnostic variables

### 4. API (`app.py`)
- `POST /api/predict/` — accepts JSON, validates all 13 fields with range checks, returns prediction + risk percentage
- `GET /health` — health check endpoint
- Logging throughout for production observability

---

## API Usage

**Endpoint:** `POST /api/predict/`

**Request:**
```json
{
  "age": 55,
  "sex": 1,
  "cp": 3,
  "trestbps": 160,
  "chol": 280,
  "fbs": 1,
  "restecg": 2,
  "thalch": 145,
  "exang": 1,
  "oldpeak": 2.5,
  "slope": 2,
  "ca": 2,
  "thal": 3
}
```

**Response:**
```json
{
  "prediction": 1,
  "risk_percentage": 87.3
}
```

**Field Reference:**

| Field | Description | Range |
|-------|-------------|-------|
| age | Patient age | 1–120 |
| sex | 1 = Male, 0 = Female | 0–1 |
| cp | Chest pain type | 0–3 |
| trestbps | Resting blood pressure (mmHg) | 50–300 |
| chol | Serum cholesterol (mg/dl) | 50–700 |
| fbs | Fasting blood sugar > 120 mg/dl | 0–1 |
| restecg | Resting ECG results | 0–3 |
| thalch | Maximum heart rate achieved | 50–250 |
| exang | Exercise-induced angina | 0–1 |
| oldpeak | ST depression induced by exercise | 0–10 |
| slope | Slope of peak exercise ST segment | 0–3 |
| ca | Number of major vessels (fluoroscopy) | 0–3 |
| thal | Thalassemia type | 0–3 |

---

## Local Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python Train_model.py      # Train and save model
python app.py              # Start Flask server on port 10000
```

### Test the API
```bash
python test.py             # Sends a sample prediction request
```

### Frontend
```bash
cd frontend
npm install
npm run dev                # Starts Next.js on localhost:3000
```

---

## Key Design Decisions

- **RandomForest over simpler models** — handles non-linear relationships between clinical features without requiring feature scaling; naturally resistant to overfitting on small medical datasets
- **Input validation with range checks** — each field has physiologically-informed bounds to catch bad inputs before they reach the model
- **Graceful label encoding** — unseen categorical values in production are mapped to -1 rather than throwing an error
- **Joblib serialization** — both model and encoders are saved separately so the API can load them independently at startup

---

## Dataset

UCI Heart Disease Dataset — combined from Cleveland, Hungary, Switzerland, and VA Long Beach. 920 patient records after cleaning.

---

## Author

**Anirudh Gupta** — CS @ University of Illinois Chicago  
[LinkedIn](https://linkedin.com/in/anirudhgupta) · [GitHub](https://github.com/anirudhgupta)
