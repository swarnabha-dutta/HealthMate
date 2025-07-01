import { getDoctorAppointments, getDoctorAvailability } from '@/actions/doctor';
import { getCurrentUser } from '@/actions/onboarding'
import { VerificationStatus } from '@prisma/client';
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
    // If user verified redirect to dashboard
    if (user?.verificationStatus !== "VERIFIED") {
        redirect("/doctor/verification");
    }
  return (
        
  )
}

export default DoctorDashboard