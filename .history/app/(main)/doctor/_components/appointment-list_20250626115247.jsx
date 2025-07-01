import { CardTitle } from '@/components/ui/card'
import React from 'react'

const DoctorAppointsList = ({ appointments }) => {
  return (
    <Card>
        <CardHeader>
        <CardTitle className="text-xl font-bold text-white">
          Card Title
        </CardTitle>
          <CardAction>Card Action</CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
    </Card>
  )
}

export default DoctorAppointsList