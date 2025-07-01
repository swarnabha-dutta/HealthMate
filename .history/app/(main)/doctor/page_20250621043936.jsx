import { getDoctorAppointments, getDoctorAvailability } from '@/actions/doctor';
import { getCurrentUser } from '@/actions/onboarding'
import { redirect } from 'next/navigation';
import React from 'react'

const DoctorDashboard = async () => {
    const user = await getCurrentUser();
    
    const [appointmentData, availabilityData] = await Promise.all([
    getDoctorAppointments(),
        getDoctorAvailability()
    ]);
    
    
    if (user?.role !== "DOCTOR") {
        redirect("/onboarding");
    }
    // If user verified redirect to daa
  return (
    <div>DoctorDashboard</div>
  )
}

export default DoctorDashboard