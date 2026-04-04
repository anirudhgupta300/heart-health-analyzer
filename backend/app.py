from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

MODEL_PATH = os.path.join(os.path.dirname(__file__), "heart_model.pkl")

REQUIRED_FIELDS = ["age", "sex", "cp", "trestbps", "chol", "fbs",
                   "restecg", "thalch", "exang", "oldpeak", "slope", "ca", "thal"]

FIELD_RANGES = {
    "age":      (1, 120),
    "sex":      (0, 1),
    "cp":       (0, 3),
    "trestbps": (50, 300),
    "chol":     (50, 700),
    "fbs":      (0, 1),
    "restecg":  (0, 3),
    "thalch":   (50, 250),
    "exang":    (0, 1),
    "oldpeak":  (0, 10),
    "slope":    (0, 3),
    "ca":       (0, 3),
    "thal":     (0, 3),
}

def load_model():
    if not os.path.exists(MODEL_PATH):
        logger.error("Model file not found at %s", MODEL_PATH)
        raise FileNotFoundError(f"Model not found. Run Train_model.py first.")
    return joblib.load(MODEL_PATH)

try:
    model = load_model()
    logger.info("Model loaded successfully.")
except Exception as e:
    logger.error("Failed to load model on startup: %s", e)
    model = None


@app.route('/api/predict/', methods=['POST'])
def make_prediction():
    global model

    if model is None:
        try:
            model = load_model()
        except FileNotFoundError as e:
            return jsonify({'error': str(e)}), 503

    data = request.get_json(silent=True)
    if data is None:
        return jsonify({'error': 'Request body must be valid JSON'}), 400

    missing = [f for f in REQUIRED_FIELDS if f not in data]
    if missing:
        return jsonify({'error': f'Missing required fields: {missing}'}), 400

    validation_errors = {}
    for field in REQUIRED_FIELDS:
        try:
            value = float(data[field])
        except (TypeError, ValueError):
            validation_errors[field] = f'Must be a number'
            continue
        lo, hi = FIELD_RANGES[field]
        if not (lo <= value <= hi):
            validation_errors[field] = f'Must be between {lo} and {hi}'

    if validation_errors:
        return jsonify({'error': 'Validation failed', 'details': validation_errors}), 422

    try:
        features = [
            999,                       # id (placeholder)
            float(data['age']),
            float(data['sex']),
            1,                         # dataset (placeholder)
            float(data['cp']),
            float(data['trestbps']),
            float(data['chol']),
            float(data['fbs']),
            float(data['restecg']),
            float(data['thalch']),
            float(data['exang']),
            float(data['oldpeak']),
            float(data['slope']),
            float(data['ca']),
            float(data['thal']),
        ]

        prediction = model.predict([features])
        probability = model.predict_proba([features])
        risk_pct = round(probability[0][1] * 100, 1)

        logger.info("Prediction: %s, Risk: %.1f%%", int(prediction[0]), risk_pct)
        return jsonify({
            'prediction': int(prediction[0]),
            'risk_percentage': risk_pct
        })

    except Exception as e:
        logger.exception("Prediction failed")
        return jsonify({'error': 'Prediction failed', 'details': str(e)}), 500


@app.route('/health', methods=['GET'])
def health_check():
    status = 'healthy' if model is not None else 'degraded'
    return jsonify({
        'status': status,
        'model_loaded': model is not None,
        'message': 'Heart Health API is running'
    }), 200 if model is not None else 503


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port)
