
// this page to get the values for the parameter
import { useState } from "react";
import { patient_data, Heart_healthApi } from "@/action/action";
import { Heart, User, Activity, Thermometer, Droplet, Zap } from "lucide-react";

interface PatientformProps {
  onSubmit: (data: patient_data) => void;
}
export default function Patientform({ onSubmit }: PatientformProps) {
  const [data, setData] = useState<Omit<patient_data, "id" | "dataset">>({
    // setting all the vlaues to 0
    age:0,
    sex: 0,
    cp: 0, // chest pain
    trestbps: 0,
    chol: 0,
    fbs: 0,
    restecg: 0,
    thalch: 0,
    exang: 0,
    oldpeak: 0,
    slope: 0,
    ca: 0,
    thal: 0,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    //change the variable user is working on and save the rest
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: parseFloat(value), // Convert to number immediately
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    // adding additional variable
    e.preventDefault();
    const completeData: patient_data = {
      id: 999,
      dataset: 1,
      ...data,
    };
    onSubmit(completeData);
    
    
  };
  const resetForm = () => {
    // resiting back to 0
    setData({
      age:0,
      sex: 0,
      cp: 0,
      trestbps: 0,
      chol: 0,
      fbs: 0,
      restecg: 0,
      thalch: 0,
      exang: 0,
      oldpeak: 0,
      slope: 0,
      ca: 0,
      thal: 0,
    });
  };
return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-10">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-10 h-10 text-white" />
              <h1 className="text-3xl font-bold text-white">Health Assessment Form</h1>
            </div>
            <p className="text-blue-100">Please fill in your health parameters for analysis</p>
          </div>

          <div className="p-8 space-y-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold">Personal Information</h2>
              </div>

              {/* Sex */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Sex</label>
                <div className="flex gap-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      value="0"
                      checked={data.sex === 0}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Male</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sex"
                      value="1"
                      checked={data.sex === 1}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">Female</span>
                  </label>
                </div>
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={data.age}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                  placeholder="e.g., 45"
                  min="1"
                  max="120"
                />
              </div>
            </div>

            {/* Chest Pain & Heart */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <Activity className="w-5 h-5 text-red-600" />
                <h2 className="text-xl font-semibold">Chest Pain & Heart Rate</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Chest Pain Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Chest Pain Type</label>
                  <div className="space-y-2">
                    {[
                      { value: 3, label: 'Typical Angina' },
                      { value: 1, label: 'Atypical Angina' },
                      { value: 2, label: 'Non-anginal Pain' },
                      { value: 0, label: 'Asymptomatic' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="cp"
                          value={option.value}
                          checked={data.cp === option.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Max Heart Rate */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Max Heart Rate Achieved (thalach)
                  </label>
                  <input
                    type="number"
                    name="thalch"
                    value={data.thalch}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                    placeholder="e.g., 150"
                  />
                </div>
              </div>
            </div>

            {/* Blood Pressure & Cholesterol */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <Thermometer className="w-5 h-5 text-orange-600" />
                <h2 className="text-xl font-semibold">Blood Pressure & Cholesterol</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Resting Blood Pressure (trestbps)
                  </label>
                  <input
                    type="number"
                    name="trestbps"
                    value={data.trestbps}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                    placeholder="e.g., 120"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Serum Cholesterol (chol)
                  </label>
                  <input
                    type="number"
                    name="chol"
                    value={data.chol}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                    placeholder="e.g., 200"
                  />
                </div>
              </div>
            </div>

            {/* Blood Sugar & Exercise */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <Droplet className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold">Blood Sugar & Exercise</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Fasting Blood Sugar */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Fasting Blood Sugar &gt; 120 mg/dl
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="fbs"
                        value="0"
                        checked={data.fbs === 0}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">No</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="fbs"
                        value="1"
                        checked={data.fbs === 1}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                  </div>
                </div>

                {/* Exercise Induced Angina */}
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Exercise Induced Angina
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="exang"
                        value="0"
                        checked={data.exang === 0}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">No</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="exang"
                        value="1"
                        checked={data.exang === 1}
                        onChange={handleChange}
                        className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Yes</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* ECG & Cardiac Tests */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-gray-700 mb-4">
                <Zap className="w-5 h-5 text-yellow-600" />
                <h2 className="text-xl font-semibold">ECG & Cardiac Tests</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Resting ECG */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Resting ECG Results
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 2, label: 'Normal' },
                      { value: 1, label: 'Not Sure?' },
                      { value: 0, label: 'Left Ventricular Hypertrophy' },
                      { value: 3, label: 'ST-T Wave Abnormality' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="restecg"
                          value={option.value}
                          checked={data.restecg === option.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Slope */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Peak Exercise ST Slope
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 3, label: 'Upsloping' },
                      { value: 1, label: 'Flat' },
                      { value: 0, label: 'Downsloping' },
                      { value: 2, label: 'Not Described' }
                    ].map(option => (
                      <label key={option.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="slope"
                          value={option.value}
                          checked={data.slope === option.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-600 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Oldpeak */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    ST Depression (oldpeak)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    name="oldpeak"
                    value={data.oldpeak}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                    placeholder="e.g., 1.5"
                  />
                </div>

                {/* CA */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Major Vessels (ca)
                  </label>
                  <input
                    type="number"
                    name="ca"
                    value={data.ca}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                    placeholder="0-3"
                    min="0"
                    max="3"
                  />
                </div>

                {/* Thal */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Thalassemia</label>
                  <select
                    name="thal"
                    value={data.thal}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-gray-900"
                  >
                    <option value="2">Normal</option>
                    <option value="0">Fixed Defect</option>
                    <option value="3">Reversible Defect</option>
                    <option value="1">Not Described</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={handleSubmit}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition"
              >
                Submit Assessment
              </button>
              <button
                onClick={resetForm}
                className="px-8 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition"
              >
                Reset Form
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}