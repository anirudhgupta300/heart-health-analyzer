export interface patient_data{
    id: number//set to 999
    sex: number
    dataset: number //set to 1
    cp:number // chest pain
    trestbps:number
    chol:number
    fbs:number
    restecg:number
    thalach:number
    exang:number
    oldpeak:number
    slope:number
    ca:number
    thal:number
}
export interface patient_result{
    prediction: number
    risk_percentage: number
}