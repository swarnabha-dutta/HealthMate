import { getDoctorById } from '@/actions/appointments';
import React from 'react'


export const generateMetaData = async ({ params }) => {
    const { id } = await params;
    const { doctor } = await getDoctorById(id);
    
}



const DoctorProfileLayout = () => {
  return (
    <div>DoctorProfileLayout</div>
  )
}

export default DoctorProfileLayout