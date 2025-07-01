"use client";


import { generateVideoToken } from '@/actions/appointments';
import { addAppointmentNotes, cancelAppointment, markAppointmentCompleted } from '@/actions/doctor';
import useFetch from '@/hooks/use-fetch';
import { Stethoscope, User } from 'lucide-react';
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card';

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


  const otherParty = userRole === "DOCTOR" ? appointment.patient : appointment.doctor;

  const otherPartyLabel = userRole === "DOCTOR" ? "Patient" : "Doctor";
  const otherPartyIcon = userRole === "DOCTOR" ? <User /> : <Stethoscope />;


  return (
    <Card>
      <CardContent>
        <div>
          <div>
            <div className='bg-muted/20 rounded-full p-2 mt-1'>
              {otherPartyIcon}
            </div>
            <div>
              <h3 className='font-medium text-white'>
                {userRole === "DOCTOR"
                  ? otherParty.name 
                  : `Dr.`
                }
              </h3>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default AppointmentCard