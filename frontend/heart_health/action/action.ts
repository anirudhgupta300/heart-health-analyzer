'use server'
export interface patient_data{
    id: number//set to 999
    age:number
    sex: number
    dataset: number //set to 1
    cp:number // chest pain
    trestbps:number
    chol:number
    fbs:number
    restecg:number
    thalch:number
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
export async function Heart_healthApi(patient_data:patient_data){
    const response = await fetch('http://localhost:5000/api/predict/', {
        method : 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(patient_data)
    } );
    if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data:patient_result = await response.json();
    return data;
}