import { getCurrentUser } from '@/actions/onboarding'
import React from 'react'

const PatientAppointmentPage = async () => {
    const user = await getCurrentUser();
    if(!user || userR)


  return (
    <div>PatientAppointmentPage</div>
  )
}

export default PatientAppointmentPage