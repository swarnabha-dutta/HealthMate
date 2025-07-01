import PageHeader from '@/components/page-header'
import { Stethoscope } from 'lucide-react'
import React from 'react'



export const metadata = {
  title: "HealthMate- Doctors Appointment app",
  description: "Connect with doctors appointments and availabilities anywhere from the world",
}

const DoctorDashboardLayout
 = ({children}) => {
  return (
    <div className='container mx-auto'>
      <PageHeader icon={<Stethoscope/>} title={"Doctors Dashboard"} />
      DoctorDashboardLayout
      {children}
    </div>
  )
}

export default DoctorDashboardLayout
