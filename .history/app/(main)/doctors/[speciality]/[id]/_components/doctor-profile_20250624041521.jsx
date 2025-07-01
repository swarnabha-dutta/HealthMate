import { Card } from '@/components/ui/card'
import React from 'react'

const DoctorProfile = ({doctor,availableDays}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <div className='md:sticky md:top-24'>
            <Card><</Card>
        </div>
      </div>
      <div className="md:col-span-2 space-y-6"></div>
    </div>
  )
}

export default DoctorProfile