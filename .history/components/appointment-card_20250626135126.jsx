
import React, { useState } from 'react'

const AppointmentCard = ({ appointment, userRole }) => {
  

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(null);//'cancel','notes
  return (
    <div>{ appointment.id} </div>
  )
}

export default AppointmentCard