'use server'

export interface patient_data {
    id: number
    age: number
    sex: number
    dataset: number
    cp: number
    trestbps: number
    chol: number
    fbs: number
    restecg: number
    thalch: number
    exang: number
    oldpeak: number
    slope: number
    ca: number
    thal: number
}

export interface patient_result {
    prediction: number
    risk_percentage: number
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://heart-health-backend.onrender.com';

export async function Heart_healthApi(data: patient_data): Promise<patient_result> {
    let response: Response;
    try {
        response = await fetch(`${API_URL}/api/predict/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    } catch {
        throw new Error('Unable to reach the server. Please check your connection.');
    }

    if (!response.ok) {
        let detail = `Server error (${response.status})`;
        try {
            const body = await response.json();
            if (body?.error) detail = body.error;
            if (body?.details && typeof body.details === 'object') {
                const fieldErrors = Object.entries(body.details)
                    .map(([k, v]) => `${k}: ${v}`)
                    .join(', ');
                detail += ` — ${fieldErrors}`;
            }
        } catch { /* ignore parse errors */ }
        throw new Error(detail);
    }

    return response.json() as Promise<patient_result>;
}
