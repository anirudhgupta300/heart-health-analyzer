from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
# give Flask an idea of what belongs to your application
app = Flask(__name__)
#Cross-Origin Resource Sharing Lets the API talk to browser without blocking
CORS(app)
#patient_data = [999,age,sex,1,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal]
model = joblib.load("heart_model.pkl")
#creates an API ENDPOINT 
#methods parameter by default is set to ['GET'].head
@app.route('/api/predict/', methods=['POST'])
def Make_prediction():
    data = request.json
    cetagories = [999, 
                data['age'],
                data['sex'],
                1,
                data['cp'],
                data['trestbps'],
                data['chol'],
                data['fbs'],
                data['restecg'],
                data['thalch'],
                data['exang'],
                data['oldpeak'],
                data['slope'],
                data['ca'],
                data['thal']]
    prediction = model.predict([cetagories])
    probability = model.predict_proba([cetagories])#always return a 2D array
    return jsonify({
        'prediction': int(prediction[0]),
        'risk_percentage': probability[0][1] * 100
    })
# to let the service know that the api is healthy and working 
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Heart Health API is running'})

# ADD THIS for Render deployment
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))  # ← Render provides PORT automatically
    app.run(host='0.0.0.0', port=port)  # ← Change this line
