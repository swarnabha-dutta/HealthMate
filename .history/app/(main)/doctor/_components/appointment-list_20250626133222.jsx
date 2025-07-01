import { Card, CardAction, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import React from 'react'

const DoctorAppointsList = ({ appointments }) => {
  return (
    <Card>
        <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center ">
          <Calendar className='h-5 w-5 mr-2 text-emerald-400' />
          Upcoming Appointments
        </CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length > 0 ? (<div></):()}
        </CardContent>
    </Card>
  )
}

export default DoctorAppointsList