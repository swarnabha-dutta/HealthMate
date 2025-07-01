import { getCurrentUser } from '@/actions/onboarding'
import React from 'react'

const PatientAppointmentPage = async () => {
    const user = await getCurrentUser();
    if (!user || user.role !== "PATIENT") {
        redirect("/onboarding");
    }

    const {appointments,error} = await getPatient

  return (
    <div>PatientAppointmentPage</div>
  )
}

export default PatientAppointmentPage