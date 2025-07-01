import { getCurrentUser } from '@/actions/onboarding'
import React from 'react'

const DoctorDashboard = () => {
    const user = await getCurrentUser()


  return (
    <div>DoctorDashboard</div>
  )
}

export default DoctorDashboard