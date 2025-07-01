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
    <div className='container mx-auto mx-4'>PatientAppointmentPage</div>
  )
}

export default PatientAppointmentPage