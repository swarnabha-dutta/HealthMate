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
    <div>PatientAppointmentPage</div>
  )
}

export default PatientAppointmentPage