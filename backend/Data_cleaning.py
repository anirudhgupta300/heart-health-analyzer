#to load and work with data set
import pandas as pd

def load_clean_data():
    #Step1: load the dataset
    df = pd.read_csv("HeartDisease.csv")
    

    #gathering all the bad data 
    df_bad = df[
        (df['trestbps']<50)|
        (df['trestbps'].isna())|
        (df['chol']<50)|
        (df['chol'].isna())
    ].index
    #dropting it
    df_clean = df.drop(df_bad)
    #make a new column target and put 1,0 depending on true and false
    df_clean['target'] = (df_clean['num'] > 0).astype(int)
    df = df_clean
    return df
#this main will only execute if this file is execute directly
if __name__ == "__main__":
    #checking data first 2 rows st pracrice
    df = load_clean_data()
    print(df.head(2))

    #checking all the data type in the dataset
    print("\nDataset info:")
    print(df.info())

    #statistical summary
    #cout: to check if missing some data when cout<total rows
    #mean; Average
    print("\nStatistical summary:")
    print(df.describe())

    #found some impossible(bad) data
    zero_bp_count = (df['trestbps'] == 0).sum()
    print(f"Patients with 0 blood pressure: {zero_bp_count}")
    print(df[df['trestbps'] == 0])
    # HERE WE ARE DONE CLEANING THE DATASET
