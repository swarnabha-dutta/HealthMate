import { getDoctorById } from '@/actions/appointments';
import React from 'react'


export const generateMetaData = async ({ params }) => {
    const { id } = await params;
    const { doctor } = await getDoctorById(id);


    return ()
}



const DoctorProfileLayout = () => {
  return (
    <div>DoctorProfileLayout</div>
  )
}

export default DoctorProfileLayout