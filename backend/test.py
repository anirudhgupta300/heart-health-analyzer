import requests

data = {
    "Age": 55, "Sex": 1, "Cp": 3, "Trestbps": 160,
    "Chol": 280, "Fbs": 1, "Restecg": 2, "Thalach": 145,
    "Exang": 1, "Oldpeak": 2.5, "slope": 2, "Ca": 2, "Thal": 3
}

response = requests.post('http://localhost:5000/api/predict', json=data)
print(response.json())