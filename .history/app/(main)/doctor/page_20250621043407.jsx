import { getCurrentUser } from '@/actions/onboarding'
import React from 'react'

const DoctorDashboard = async () => {
    const user = await getCurrentUser();
    if (user?.role !== "DOCTOR") {
        re
    }

  return (
    <div>DoctorDashboard</div>
  )
}

export default DoctorDashboard