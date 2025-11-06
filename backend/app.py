from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib

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
                data['Age'],
                data['Sex'],
                1,
                data['Cp'],
                data['Trestbps'],
                data['Chol'],
                data['Fbs'],
                data['Restecg'],
                data['Thalach'],
                data['Exang'],
                data['Oldpeak'],
                data['slope'],
                data['Ca'],
                data['Thal']]
    prediction = model.predict([cetagories])
    probability = model.predict_proba([cetagories])#always return a 2D array
    return jsonify({
        'prediction': int(prediction[0]),
        'risk_percentage': probability[0][1] * 100
    })

if __name__ == '__main__':
    app.run(debug=True)
    