"use client"; 
import { Heart, Activity, Shield, BarChart, Clock, ChevronRight, Sparkles } from 'lucide-react';
import Patientform from "@/components/search";
import { patient_data } from "@/action/action";
import { useRouter } from 'next/navigation';
export default function Home() {
  const router = useRouter();
  const handleFormSubmit =()=> {

    router.push('/result');
    };
    

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Heart Health Analyzer
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered heart disease risk prediction using machine learning
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <Activity className="w-16 h-16 text-blue-600 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Check Your Heart Health
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Enter your health parameters and let our machine learning model analyze 
            your risk of heart disease. Get instant results based on clinical data.
          </p>
          
          <button onClick={handleFormSubmit} className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-full hover:shadow-lg transform hover:scale-105 transition flex items-center gap-2 mx-auto">
            Start Assessment
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-8">
          For educational purposes only. Always consult healthcare professionals.
        </p>
      </div>
    </div>
  );
}
