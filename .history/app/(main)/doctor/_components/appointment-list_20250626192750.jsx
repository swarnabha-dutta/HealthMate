import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const DoctorAppointmentsList = ({appointments}) => {
  return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-emerald-400" />
                    Upcoming Appointments
            </CardTitle>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
        </Card>
  )
}

export default DoctorAppointmentsList