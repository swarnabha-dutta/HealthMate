import { getDoctorById } from '@/actions/appointments';
import React from 'react'


export const generateMetaData = async ({ params }) => {
    const { id } = await params;
    const { doctor } = await getDoctorById(id);


    return {
        title: `Dr.${doctor.name}-Healthmate`,
        description:`Book an appointment with Dr.${doctor.name},${doctor.speciality} specialist with ${doctor.e}`
    }
}



const DoctorProfileLayout = () => {
  return (
    <div>DoctorProfileLayout</div>
  )
}

export default DoctorProfileLayout