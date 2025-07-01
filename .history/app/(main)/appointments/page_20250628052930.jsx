import { getCurrentUser } from '@/actions/onboarding'
import { getPatientAppointments } from '@/actions/patient';
import PageHeader from '@/components/page-header';
import React from 'react'

const PatientAppointmentPage = async () => {
    const user = await getCurrentUser();
    if (!user || user.role !== "PATIENT") {
        redirect("/onboarding");
    }

    const { appointments, error } = await getPatientAppointments();


  return (
        <div className='container mx-auto px-4'>
          <PageHeader
          


          
        </div>
  )
}

export default PatientAppointmentPage