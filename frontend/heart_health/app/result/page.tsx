'use client';
import { Suspense } from 'react';
import { Heart, AlertCircle, CheckCircle, Info, TrendingUp, Shield } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

// Create a separate component for the content that uses useSearchParams
function ResultContent() {
  const searchParams = useSearchParams();
  const score = searchParams.get('score'); // This is 0 or 1
  const risk = searchParams.get('risk');   // This is percentage (e.g., 85.5)
  
  const scoreValue = parseInt(score || '0');
  const riskValue = parseFloat(risk || '0');

  // Determine risk level based on risk percentage
  const getRiskLevel = () => {
    if (riskValue < 30) return 'low';
    if (riskValue < 70) return 'medium';
    return 'high';
  };

  const riskLevel = getRiskLevel();

  const getRiskColor = () => {
    if (riskLevel === 'low') return 'from-green-500 to-emerald-600';
    if (riskLevel === 'medium') return 'from-yellow-500 to-orange-600';
    if (riskLevel === 'high') return 'from-red-500 to-pink-600';
    return 'from-gray-500 to-gray-600';
  };

  const getRiskIcon = () => {
    if (riskLevel === 'low') return <CheckCircle className="w-16 h-16" />;
    if (riskLevel === 'medium') return <Info className="w-16 h-16" />;
    if (riskLevel === 'high') return <AlertCircle className="w-16 h-16" />;
    return <Heart className="w-16 h-16" />;
  };

  const getRiskMessage = () => {
    if (riskLevel === 'low') {
      return {
        title: 'Low Risk',
        message: 'Your assessment indicates a low risk of heart disease. Keep maintaining your healthy lifestyle!',
        recommendations: [
          'Continue regular physical activity',
          'Maintain a balanced diet',
          'Schedule regular health check-ups',
          'Monitor your vitals periodically'
        ]
      };
    }
    if (riskLevel === 'medium') {
      return {
        title: 'Moderate Risk',
        message: 'Your assessment shows moderate risk factors. Consider lifestyle modifications and consult with a healthcare provider.',
        recommendations: [
          'Schedule a consultation with your doctor',
          'Adopt a heart-healthy diet',
          'Increase physical activity gradually',
          'Monitor blood pressure and cholesterol'
        ]
      };
    }
    if (riskLevel === 'high') {
      return {
        title: 'High Risk',
        message: 'Your assessment indicates elevated risk factors. We strongly recommend consulting a healthcare professional soon.',
        recommendations: [
          'Consult a cardiologist as soon as possible',
          'Discuss medication options with your doctor',
          'Make immediate lifestyle changes',
          'Regular monitoring of cardiac health'
        ]
      };
    }
    return {
      title: 'Assessment Complete',
      message: 'Your health assessment has been processed.',
      recommendations: ['Consult with a healthcare professional for detailed analysis']
    };
  };

  const riskInfo = getRiskMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Assessment Results</h1>
          </div>
          <p className="text-gray-600">Based on your health parameters</p>
        </div>

        {/* Main Result Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          {/* Risk Level Banner */}
          <div className={`bg-gradient-to-r ${getRiskColor()} px-8 py-12 text-white text-center`}>
            <div className="flex justify-center mb-4">
              {getRiskIcon()}
            </div>
            <h2 className="text-4xl font-bold mb-2">{riskInfo.title}</h2>
            {risk && (
              <div className="text-xl opacity-90">
                Risk Percentage: {riskValue.toFixed(1)}%
              </div>
            )}
            {score && (
              <div className="text-lg opacity-90 mt-2">
                Prediction: {scoreValue === 1 ? 'At Risk' : 'Not At Risk'}
              </div>
            )}
          </div>

          {/* Message Section */}
          <div className="p-8">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg mb-8">
              <p className="text-lg text-gray-800 leading-relaxed">
                {riskInfo.message}
              </p>
            </div>

            {/* Recommendations */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                Recommendations
              </h3>
              <ul className="space-y-3">
                {riskInfo.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-600 text-sm font-semibold">{index + 1}</span>
                    </div>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex gap-3">
                <Shield className="w-6 h-6 text-yellow-600 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Important Notice</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    This assessment is for educational and informational purposes only. It is not a substitute 
                    for professional medical advice, diagnosis, or treatment. Always seek the advice of your 
                    physician or other qualified health provider with any questions you may have regarding 
                    a medical condition.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-8 pb-8 flex gap-4">
            <button 
              onClick={() => window.location.href = '/'}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition"
            >
              Take Another Assessment
            </button>
            <button className="px-6 py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition">
              Download Report
            </button>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <InfoCard
            icon={<Heart className="w-6 h-6" />}
            title="Stay Active"
            description="Regular exercise is key to heart health"
            color="text-red-600"
          />
          <InfoCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Monitor Health"
            description="Track your vitals regularly"
            color="text-blue-600"
          />
          <InfoCard
            icon={<Shield className="w-6 h-6" />}
            title="Stay Informed"
            description="Learn about heart health"
            color="text-green-600"
          />
        </div>
      </div>
    </div>
  );
}

// Keep InfoCard outside the Suspense since it doesn't use useSearchParams
function InfoCard({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
      <div className={`${color} mb-3`}>
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}

// Main component with Suspense boundary
export default function Result() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-blue-600 animate-pulse mx-auto mb-4" />
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}