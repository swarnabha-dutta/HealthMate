import { getDoctorById } from '@/actions/appointments';
import { redirect } from 'next/navigation';
import React from 'react'


export const generateMetaData = async ({ params }) => {
    const { id } = await params;
    const { doctor } = await getDoctorById(id);


    return {
        title: `Dr.${doctor.name}-Healthmate`,
        description:`Book an appointment with Dr.${doctor.name},${doctor.speciality} specialist with ${doctor.experience} years of experience`,
    }
}



const DoctorProfileLayout = async ({ children,params }) => {
    const { id } = await params;
    const { doctor } = await getDoctorById(id);
    if (!doctor) redirect("/doctors");


  return (
      <div>
          
    </div>
  )
}

export default DoctorProfileLayout