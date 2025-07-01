"use client";


import { generateVideoToken } from '@/actions/appointments';
import { addAppointmentNotes, cancelAppointment, markAppointmentCompleted } from '@/actions/doctor';
import useFetch from '@/hooks/use-fetch';
import React, { useState } from 'react'

const AppointmentCard = ({ appointment, userRole }) => {
  

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState(null);//'cancel','notes','video' or 'complete'
  const [notes, setNotes] = useState(appointment.notes || "");

  // UseFetch hooks for server actions
  const {
    loading: cancelLoading,
    fn: submitCancel,
    data: cancelData,
  } = useFetch(cancelAppointment);
  const {
    loading: notesLoading,
    fn: submitNotes,
    data: notesData,
  } = useFetch(addAppointmentNotes);
  const {
    loading: tokenLoading,
    fn: submitTokenRequest,
    data: tokenData,
  } = useFetch(generateVideoToken);
  const {
    loading: completeLoading,
    fn: submitMarkCompleted,
    data: completeData,
  } = useFetch(markAppointmentCompleted);


  const otherParty = userRole === "DOCTOR" ? appointment.patient : appointment.

  return (
    <div>{ appointment.id} </div>
  )
}

export default AppointmentCard