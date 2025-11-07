'use client'
import { Heart_healthApi } from "@/action/action";
import { patient_data } from "@/action/action";
import Patientform from "@/components/search";
export default function result(){
    const handleSubmit= async (data:patient_data)=>{
        const result = await Heart_healthApi(data);
        console.log(result);

    }
    return (<>
    <Patientform onSubmit={handleSubmit}></Patientform>
    </>);
}