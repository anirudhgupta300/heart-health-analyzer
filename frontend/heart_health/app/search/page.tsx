'use client'
import { Heart_healthApi } from "@/action/action";
import { patient_data } from "@/action/action";
import { useRouter } from 'next/navigation';
import Patientform from "@/components/search";
export default function result(){
    const router = useRouter();
    const handleSubmit= async (data:patient_data)=>{
        const result = await Heart_healthApi(data);
        
        console.log(result);
        router.push(`/result?score=${result.prediction}&risk=${result.risk_percentage}`);

    }
    return (<>
    <Patientform onSubmit={handleSubmit}></Patientform>
    </>);
}