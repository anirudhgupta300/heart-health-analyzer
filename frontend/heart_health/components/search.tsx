'use client'
import { useState } from 'react';
import { patient_data } from '@/action/action';
import { Heart, User, Activity, Thermometer, Droplet, Zap, Loader2 } from 'lucide-react';

export interface PatientformProps {
    onSubmit: (data: patient_data) => void;
    isLoading?: boolean;
}

type FormFields = Omit<patient_data, 'id' | 'dataset'>;
type FormErrors = Partial<Record<keyof FormFields, string>>;

const INITIAL: FormFields = {
    age: 0, sex: 0, cp: 0, trestbps: 0, chol: 0,
    fbs: 0, restecg: 0, thalch: 0, exang: 0,
    oldpeak: 0, slope: 0, ca: 0, thal: 0,
};

function validate(data: FormFields): FormErrors {
    const errors: FormErrors = {};
    if (!data.age || data.age < 1 || data.age > 120)
        errors.age = 'Age must be between 1 and 120';
    if (data.trestbps < 50 || data.trestbps > 300)
        errors.trestbps = 'Blood pressure must be between 50 and 300 mmHg';
    if (data.chol < 50 || data.chol > 700)
        errors.chol = 'Cholesterol must be between 50 and 700 mg/dl';
    if (data.thalch < 50 || data.thalch > 250)
        errors.thalch = 'Max heart rate must be between 50 and 250 bpm';
    if (data.oldpeak < 0 || data.oldpeak > 10)
        errors.oldpeak = 'ST depression must be between 0 and 10';
    if (data.ca < 0 || data.ca > 3)
        errors.ca = 'Number of major vessels must be 0–3';
    return errors;
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="text-red-500 text-xs mt-1">{message}</p>;
}

export default function Patientform({ onSubmit, isLoading = false }: PatientformProps) {
    const [data, setData] = useState<FormFields>(INITIAL);
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const parsed = parseFloat(value);
        setData(prev => ({ ...prev, [name]: isNaN(parsed) ? 0 : parsed }));
        if (errors[name as keyof FormFields]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(data);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            const firstErrorField = document.querySelector('[data-error="true"]');
            firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        onSubmit({ id: 999, dataset: 1, ...data });
    };

    const resetForm = () => {
        setData(INITIAL);
        setErrors({});
    };

    const inputClass = (field: keyof FormFields) =>
        `w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900 ${
            errors[field] ? 'border-red-400 bg-red-50' : 'border-gray-200'
        }`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} noValidate>
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-10">
                            <div className="flex items-center gap-3 mb-2">
                                <Heart className="w-10 h-10 text-white" />
                                <h1 className="text-3xl font-bold text-white">Health Assessment Form</h1>
                            </div>
                            <p className="text-blue-100">Please fill in your health parameters for analysis</p>
                        </div>

                        <div className="p-8 space-y-8">
                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <User className="w-5 h-5 text-blue-600" />
                                    <h2 className="text-xl font-semibold">Personal Information</h2>
                                </div>

                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700">Sex</label>
                                    <div className="flex gap-6">
                                        {[{ value: 0, label: 'Male' }, { value: 1, label: 'Female' }].map(opt => (
                                            <label key={opt.value} className="flex items-center cursor-pointer">
                                                <input type="radio" name="sex" value={opt.value}
                                                    checked={data.sex === opt.value} onChange={handleChange}
                                                    className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                                                <span className="ml-2 text-gray-700">{opt.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2" data-error={!!errors.age}>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Age <span className="text-gray-400 font-normal">(years)</span>
                                    </label>
                                    <input type="number" name="age" value={data.age || ''}
                                        onChange={handleChange} min="1" max="120"
                                        className={inputClass('age')} placeholder="e.g., 45" />
                                    <FieldError message={errors.age} />
                                </div>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Activity className="w-5 h-5 text-red-600" />
                                    <h2 className="text-xl font-semibold">Chest Pain & Heart Rate</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Chest Pain Type</label>
                                        <div className="space-y-2">
                                            {[
                                                { value: 3, label: 'Typical Angina' },
                                                { value: 1, label: 'Atypical Angina' },
                                                { value: 2, label: 'Non-anginal Pain' },
                                                { value: 0, label: 'Asymptomatic' },
                                            ].map(opt => (
                                                <label key={opt.value} className="flex items-center cursor-pointer">
                                                    <input type="radio" name="cp" value={opt.value}
                                                        checked={data.cp === opt.value} onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                                                    <span className="ml-2 text-gray-700">{opt.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2" data-error={!!errors.thalch}>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Max Heart Rate Achieved <span className="text-gray-400 font-normal">(bpm)</span>
                                        </label>
                                        <input type="number" name="thalch" value={data.thalch || ''}
                                            onChange={handleChange} min="50" max="250"
                                            className={inputClass('thalch')} placeholder="e.g., 150" />
                                        <FieldError message={errors.thalch} />
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Thermometer className="w-5 h-5 text-orange-600" />
                                    <h2 className="text-xl font-semibold">Blood Pressure & Cholesterol</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2" data-error={!!errors.trestbps}>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Resting Blood Pressure <span className="text-gray-400 font-normal">(mmHg)</span>
                                        </label>
                                        <input type="number" name="trestbps" value={data.trestbps || ''}
                                            onChange={handleChange} min="50" max="300"
                                            className={inputClass('trestbps')} placeholder="e.g., 120" />
                                        <FieldError message={errors.trestbps} />
                                    </div>

                                    <div className="space-y-2" data-error={!!errors.chol}>
                                        <label className="block text-sm font-medium text-gray-700">
                                            Serum Cholesterol <span className="text-gray-400 font-normal">(mg/dl)</span>
                                        </label>
                                        <input type="number" name="chol" value={data.chol || ''}
                                            onChange={handleChange} min="50" max="700"
                                            className={inputClass('chol')} placeholder="e.g., 200" />
                                        <FieldError message={errors.chol} />
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Droplet className="w-5 h-5 text-purple-600" />
                                    <h2 className="text-xl font-semibold">Blood Sugar & Exercise</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Fasting Blood Sugar &gt; 120 mg/dl
                                        </label>
                                        <div className="flex gap-6">
                                            {[{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }].map(opt => (
                                                <label key={opt.value} className="flex items-center cursor-pointer">
                                                    <input type="radio" name="fbs" value={opt.value}
                                                        checked={data.fbs === opt.value} onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                                                    <span className="ml-2 text-gray-700">{opt.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Exercise Induced Angina
                                        </label>
                                        <div className="flex gap-6">
                                            {[{ value: 0, label: 'No' }, { value: 1, label: 'Yes' }].map(opt => (
                                                <label key={opt.value} className="flex items-center cursor-pointer">
                                                    <input type="radio" name="exang" value={opt.value}
                                                        checked={data.exang === opt.value} onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                                                    <span className="ml-2 text-gray-700">{opt.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Zap className="w-5 h-5 text-yellow-600" />
                                    <h2 className="text-xl font-semibold">ECG & Cardiac Tests</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Resting ECG Results</label>
                                        <div className="space-y-2">
                                            {[
                                                { value: 2, label: 'Normal' },
                                                { value: 1, label: 'Not Sure' },
                                                { value: 0, label: 'Left Ventricular Hypertrophy' },
                                                { value: 3, label: 'ST-T Wave Abnormality' },
                                            ].map(opt => (
                                                <label key={opt.value} className="flex items-center cursor-pointer">
                                                    <input type="radio" name="restecg" value={opt.value}
                                                        checked={data.restecg === opt.value} onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                                                    <span className="ml-2 text-gray-700">{opt.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Peak Exercise ST Slope</label>
                                        <div className="space-y-2">
                                            {[
                                                { value: 3, label: 'Upsloping' },
                                                { value: 1, label: 'Flat' },
                                                { value: 0, label: 'Downsloping' },
                                                { value: 2, label: 'Not Described' },
                                            ].map(opt => (
                                                <label key={opt.value} className="flex items-center cursor-pointer">
                                                    <input type="radio" name="slope" value={opt.value}
                                                        checked={data.slope === opt.value} onChange={handleChange}
                                                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500" />
                                                    <span className="ml-2 text-gray-700">{opt.label}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-6">
                                    <div className="space-y-2" data-error={!!errors.oldpeak}>
                                        <label className="block text-sm font-medium text-gray-700">ST Depression (oldpeak)</label>
                                        <input type="number" step="0.1" name="oldpeak" value={data.oldpeak}
                                            onChange={handleChange} min="0" max="10"
                                            className={inputClass('oldpeak')} placeholder="e.g., 1.5" />
                                        <FieldError message={errors.oldpeak} />
                                    </div>

                                    <div className="space-y-2" data-error={!!errors.ca}>
                                        <label className="block text-sm font-medium text-gray-700">Major Vessels (ca)</label>
                                        <input type="number" name="ca" value={data.ca}
                                            onChange={handleChange} min="0" max="3"
                                            className={inputClass('ca')} placeholder="0–3" />
                                        <FieldError message={errors.ca} />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-gray-700">Thalassemia</label>
                                        <select name="thal" value={data.thal} onChange={handleChange}
                                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900">
                                            <option value="2">Normal</option>
                                            <option value="0">Fixed Defect</option>
                                            <option value="3">Reversible Defect</option>
                                            <option value="1">Not Described</option>
                                        </select>
                                    </div>
                                </div>
                            </section>

                            <div className="flex gap-4 pt-6">
                                <button type="submit" disabled={isLoading}
                                    className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2">
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Analyzing...
                                        </>
                                    ) : (
                                        'Submit Assessment'
                                    )}
                                </button>
                                <button type="button" onClick={resetForm} disabled={isLoading}
                                    className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition disabled:opacity-60 disabled:cursor-not-allowed">
                                    Reset Form
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
