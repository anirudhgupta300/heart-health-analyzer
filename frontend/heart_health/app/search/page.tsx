'use client'
import { useState } from 'react';
import { Heart_healthApi, patient_data } from '@/action/action';
import { useRouter } from 'next/navigation';
import Patientform from '@/components/search';
import { AlertCircle } from 'lucide-react';

export default function SearchPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (data: patient_data) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await Heart_healthApi(data);
            router.push(`/result?score=${result.prediction}&risk=${result.risk_percentage}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
            setIsLoading(false);
        }
    };

    return (
        <>
            {error && (
                <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full px-4">
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 shadow-lg">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-red-800">Submission failed</p>
                            <p className="text-sm text-red-700 mt-0.5">{error}</p>
                        </div>
                        <button
                            onClick={() => setError(null)}
                            className="ml-auto text-red-400 hover:text-red-600 text-lg leading-none"
                            aria-label="Dismiss error"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
            <Patientform onSubmit={handleSubmit} isLoading={isLoading} />
        </>
    );
}
