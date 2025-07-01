"use client";


import { generateVideoToken } from '@/actions/appointments';
import { addAppointmentNotes, cancelAppointment, markAppointmentCompleted } from '@/actions/doctor';
import useFetch from '@/hooks/use-fetch';
import { Calendar, Stethoscope, User } from 'lucide-react';
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card';

const AppointmentCard = ({ appointment, userRole }) => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState(null); // 'cancel', 'notes', 'video', or 'complete'
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

    const otherParty = userRole === "DOCTOR" ? "PATIENT" : appointment.doctor;

    const otherPartyLabel = userRole === "DOCTOR" ? "PATIENT" : "Doctor";
    const otherPartyIcon = userRole === "DOCTOR" ? <User/> : <Stethoscope/>


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
                                : `Dr.${otherParty.name}` 
                                }
                        </h3>
                        {userRole === "DOCTOR" && (
                            <p className="text-sm text-muted-foreground">
                                {otherParty.email}
                            </p>
                        )}
                        {userRole === "PATIENT" && (
                            <p className='text-sm text-muted-foreground'>
                                {otherParty.speciality}
                            </p>
                          )}
                          
                          <div className='flex items-center mt-2 text-sm text-muted-foreground'>
                              <Calendar className='h-4 w-4 mr-1' />
                              <span>{formDateTime</span>
                          </div>


                    </div>
                    </div>
                </div>
            </CardContent>
        </Card>
  )
}

export default AppointmentCard;