import { getCurrentUser } from '@/actions/onboarding'
import { getPatientAppointments } from '@/actions/patient';
import React from 'react'

const PatientAppointmentPage = async () => {
    const user = await getCurrentUser();
    if (!user || user.role !== "PATIENT") {
        redirect("/onboarding");
    }

    const { appointments, error } = await getPatientAppointments();


  return (
        <div className='container mx-auto px-4'>
            <
        </div>
  )
}

export default PatientAppointmentPage