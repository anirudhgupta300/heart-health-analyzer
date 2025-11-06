#To save the model
import joblib
import pandas
#Numerical computing 
import numpy as np
#splits your data into training and testing sets
from sklearn.model_selection import train_test_split
#Standardizes features by removing mean and scaling to unit variance
from sklearn.preprocessing import LabelEncoder
#learining model
from sklearn.ensemble import RandomForestClassifier
def Train_model(df):
    #STEP 2: Prepare Data for Scikit-Learn
    #Make two variable X , Y
    #X will be the data it will learn from
    # Y will be the target
    X = df.drop(['num','target'],axis=1)
    Y = df['target']
    
    #Split data
    X_train, X_test, Y_train,Y_test = train_test_split(X,Y, test_size=0.2)

    # Convert text columns(Text) to numbers
    label_encoder = {}
    for column in ['sex', 'cp', 'restecg', 'slope', 'thal','dataset']: # this will convert all column having text to numbers
        le = LabelEncoder()
        X_train[column] = le.fit_transform(X_train[column].astype(str))  # 2. Convert training data
        X_test[column] = le.transform(X_test[column].astype(str))        # 3. Convert test data  
        label_encoder[column] = le                           # 4. save encoder
    print("\n=== SAMPLE ORIGINAL vs CONVERTED ===")
    sample_indices = X_train.index[:50]  # First 5 rows in training set
    for idx in sample_indices:
        original = df.loc[idx, 'sex']  # Original value from your dataset
        converted = X_train.loc[idx, 'sex']  # Converted number
        print(f"Row {idx}: '{original}' → {converted}")

    # choose a model
    model = RandomForestClassifier()
    #Learning Complete
    model.fit(X_train,Y_train)
    #saving model
    joblib.dump(model, 'heart_model.pkl')

    return X_test, Y_test, model

if __name__ == "__main__":
    from Data_cleaning import load_clean_data
    df = load_clean_data()
    X_test, Y_test, model = Train_model(df)
    print("All done")
