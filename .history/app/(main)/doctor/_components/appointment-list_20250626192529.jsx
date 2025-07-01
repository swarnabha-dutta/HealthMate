import React from 'react'

const DoctorAppointmentsList = ({appointments}) => {
  return (
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
  )
}

export default DoctorAppointmentsList