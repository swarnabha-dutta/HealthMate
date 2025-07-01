
import React from 'react'

const AppointmentCard = ({ appointment, useRole }) => {
  console.log(appointment);
  return (
    <div>{ appointment.startTime}</div>
  )
}

export default AppointmentCard