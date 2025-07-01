import { getCurrentUser } from '@/actions/onboarding'
import { redirect } from 'next/navigation';
import React from 'react'

const DoctorDashboard = async () => {
    const user = await getCurrentUser();
    
    const [appointmentData,availabi]
    
    
    if (user?.role !== "DOCTOR") {
        redirect("/onboarding");
    }

  return (
    <div>DoctorDashboard</div>
  )
}

export default DoctorDashboard