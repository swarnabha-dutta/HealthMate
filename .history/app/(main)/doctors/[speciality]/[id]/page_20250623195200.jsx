import { getDoctorById } from '@/actions/appointments';
import React from 'react'

const DoctorProfilePage = async ({ params }) => {
    const { id } = await params;
    try {
        const [doctorData, slotsData] = await Promise.all([
            getDoctorById(id),
            gotAvailable
        ])
    } catch (error) {
        
    }

  return (
    <div>DoctorProfilePage</div>
  )
}

export default DoctorProfilePage