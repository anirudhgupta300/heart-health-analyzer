"use client"; 
import Patientform from "@/components/search";
import { patient_data } from "@/action/action";
export default function Home() {
  const handleFormSubmit = (patient_Data: patient_data) => {
    // Send to your Flask API
    console.log('Submitting:', patient_Data);};
  return (
    <div>
      <Patientform onSubmit={handleFormSubmit}></Patientform>
    </div>
  );
}
