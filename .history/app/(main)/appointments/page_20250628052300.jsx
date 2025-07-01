import { getCurrentUser } from '@/actions/onboarding'
import React from 'react'

const PatientAppointmentPage = async () => {
    const user = await getCurrentUser();
    if (!user || user.role !== "PATIENT") {
        redirect("/onboarding");
    }

    const {appointments,error} = await

  return (
    <div>PatientAppointmentPage</div>
  )
}

export default PatientAppointmentPage