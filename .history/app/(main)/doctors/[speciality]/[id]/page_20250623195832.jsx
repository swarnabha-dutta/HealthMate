import { getAvailableTimeSlots, getDoctorById } from '@/actions/appointments';
import { redirect } from 'next/navigation';
import React from 'react'

const DoctorProfilePage = async ({ params }) => {
    const { id } = await params;
    try {
        const [doctorData, slotsData] = await Promise.all([
            getDoctorById(id),
            getAvailableTimeSlots(id)
        ]);
        return <DoctorProfile
            doctor={doctorData.doctor}
            available
                    />
    } catch (error) {
        console.error("Error loading doctor profile:", error);
        redirect("/doctors");
    }

  return (
    <div>DoctorProfilePage</div>
  )
}

export default DoctorProfilePage