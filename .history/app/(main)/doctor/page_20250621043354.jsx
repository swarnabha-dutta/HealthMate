import { getCurrentUser } from '@/actions/onboarding'
import React from 'react'

const DoctorDashboard = async () => {
    const user = await getCurrentUser();
    if(user?)

  return (
    <div>DoctorDashboard</div>
  )
}

export default DoctorDashboard