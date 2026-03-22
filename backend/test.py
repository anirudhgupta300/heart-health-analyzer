import requests

data = {
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

response = requests.post('http://localhost:10000/api/predict/', json=data)
print(response.json())