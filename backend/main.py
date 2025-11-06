from Data_cleaning import load_clean_data
from Train_model import Train_model
from sklearn.metrics import accuracy_score
import os
import joblib
# Example: 55-year-old male with high risk factors
# new_patient = [
#     55,           # age
#     1,            # sex (1=Male, 0=Female)  
#     3,            # cp (chest pain type: 0-3)
#     160,          # trestbps (blood pressure)
#     280,          # chol (cholesterol)
#     1,            # fbs (fasting blood sugar >120)
#     2,            # restecg (ECG results)
#     145,          # thalach (max heart rate)
#     1,            # exang (exercise angina)
#     2.5,          # oldpeak (ST depression)
#     2,            # slope (ST slope)
#     2,            # ca (number of vessels)
#     3             # thal (thalassemia type)
# ]

def main():
    if os.path.exists('heart_health.pkl'):  # Fixed filename consistency
        choice = input("Model already exists! Retrain? (y/n): ")
        if choice.lower() != 'y':
            print("Using existing model for prediction...")
            model = joblib.load("heart_health.pkl")  # Fixed filename
            result = predict_risk(model)
            print(f"\n{result}")
            return  # Exit after prediction

    print("Loading clean data")
    df = load_clean_data()
    print("Training Model...")
    X_test, Y_test, model = Train_model(df)
    joblib.dump(model, 'heart_health.pkl')  # Fixed filename consistency
    print("Pipeline complete! Ready for predictions.")
    
    # Checking the predictions
    predictions = model.predict(X_test)
    print(f"Predictions for {len(predictions)} patients: {predictions}")
    accuracy = accuracy_score(Y_test, predictions)
    print(f"Accuracy: {accuracy}")
    print("Class distribution:")
    print(df['num'].value_counts())

def predict_risk(model):
    # Your existing inputs...
    age = int(input("Enter Age: "))
    sex = int(input("Enter sex (1=Male, 0=Female): "))
    cp = int(input("Enter chest pain (0-3): "))
    trestbps = int(input("Enter blood pressure: "))
    chol = int(input("Enter cholesterol: "))
    fbs = int(input("Fasting blood sugar >120 (1=True, 0=False): "))
    restecg = int(input("Enter ECG result (0-3): "))
    thalach = int(input("Enter max heart rate: "))
    exang = int(input("Exercise-induced angina (1=True, 0=False): "))
    oldpeak = float(input("Enter ST depression: "))
    slope = int(input("Enter slope (0-3): "))
    ca = int(input("Enter number of major vessels (0-3): "))
    thal = int(input("Enter thalassemia type (0-3): "))

    patient_data = [999, age, sex, 1, cp, trestbps, chol, fbs, restecg, thalach, 
                exang, oldpeak, slope, ca, thal]
    
    prediction = model.predict([patient_data])
    probability = model.predict_proba([patient_data])
    risk_percent = probability[0][1] * 100
    
    
    if prediction[0] == 1:
        return f"HIGH RISK: {risk_percent:.1f}% chance of heart disease"
    else:
        return f"LOW RISK: {risk_percent:.1f}% chance of heart disease"

if __name__ == "__main__":
    main()