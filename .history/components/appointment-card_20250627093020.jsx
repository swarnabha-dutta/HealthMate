"use client";


import { generateVideoToken } from '@/actions/appointments';
import { addAppointmentNotes, cancelAppointment, markAppointmentCompleted } from '@/actions/doctor';
import useFetch from '@/hooks/use-fetch';
import {  Calendar, Clock, Stethoscope, User } from 'lucide-react';
import React, { useState } from 'react'
import { Card, CardContent } from './ui/card';
import { format } from 'date-fns';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

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

    const otherParty = userRole === "DOCTOR" ? appointment.patient : appointment.doctor;

    const otherPartyLabel = userRole === "DOCTOR" ? "PATIENT" : "Doctor";
    const otherPartyIcon = userRole === "DOCTOR" ? <User/> : <Stethoscope/>
    const formatDateTime = (dateString) => {
        try {
            return format(new Date(dateString), "MMMM d,yyyy 'at' h:mm a");
        } catch (error) {
            return "Invalid date";
        }
    }
    const formatTime = (dateString) => {
        try {
            return format(new Date(dateString), "h:mm a");
        } catch (error) {
            return "Invalid time"
        }
    }
    const canMarkCompleted = () => {
        if (userRole !== "DOCTOR" || appointment.status !== "SCHEDULED") {
            return false;
        }
        const now = new Date();
        const appointmentEndTime = new Date(appointment.endTime);
        return now >= appointmentEndTime;
    }



  return (
        <Card className="border-emerald-900/20 hover:border-emerald-700/30 transition-all">
            <CardContent className="p-4">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="flex items-start gap-3">
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
                            <span>{formatDateTime(appointment.startTime)}</span>
                        </div>
                        <div className='flex items-center mt-2 text-sm text-muted-foreground'>
                            <Clock className='h-4 w-4 mr-1' />
                            <span>
                                {formatTime(appointment.startTime)} - {" "}
                                {formatTime(appointment.endTime)}
                            </span>
                        </div>
                    </div>
                    </div>
                    <div className='flex flex-col gap-2 self-end md:self-start'>
                    <Badge
                    variant="outline"
                    className={
                        appointment.status === "COMPLETED"
                        ? "bg-emerald-900/20 border-emerald-900/30 text-emerald-400"
                        : appointment.status === "CANCELLED"
                        ? "bg-red-900/20 border-emerald-900/30 text-red-400"
                        : "bg-amber-900/20 border-amber-900/30 text-amber-400"        
                        }
                    >
                    {appointment.status} 
                    </Badge>
                    <div>
                        {canMarkCompleted() && (
                              <Button
                                size={}  
                                className="bg-emerald-600 hover:bg-emerald-700">
                                Complete
                            </Button>
                        )}
                    </div> 
                </div>
                </div>
            </CardContent>
        </Card>
  )
}

export default AppointmentCard;