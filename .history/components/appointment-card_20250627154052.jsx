"use client";


import { generateVideoToken } from '@/actions/appointments';
import { addAppointmentNotes, cancelAppointment, markAppointmentCompleted } from '@/actions/doctor';
import useFetch from '@/hooks/use-fetch';
import {  Calendar, CheckCircle, Clock, Loader2, Stethoscope, User, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from './ui/card';
import { format } from 'date-fns';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { useRouter } from 'next/navigation';

const AppointmentCard = ({ appointment, userRole }) => {
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState(null); // 'cancel', 'notes', 'video', or 'complete'
    const [notes, setNotes] = useState(appointment.notes || "");
    
    const router = useRouter();
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

    const handleMarkCompleted = async () => {
        if (completeLoading) return;
        if (window.confirm("Are you sure you want to cancel this appointment? This action cannot be undone.")
        ) {
            const formData = new FormData();
            formData.append("appointmentId", appointment.id);
            await submitMarkCompleted(formData);
        }
    };

    useEffect(() => {
        if (completeData?.success) {
            toast.success("Appointment marked as completed");
            setOpen(false);
        }
    }, [completeData]);




    const isAppointmentActive = () => {
        const now = new Date();
        const appointmentTime = new Date(appointment.startTime);
        const appointmentEndTime = new Date(appointment.endTime);

        // Can join 30 minutes before start until the end

        return (
            (appointmentTime.getTime() - now.getTime() <= 30 * 60 * 1000 &&
                now < appointmentTime) || (now >= appointmentTime && now <= appointmentEndTime)
        );
    };
    const handleJoinVideoCall = async () => {
        if (tokenLoading) return;
        setAction("video");
        const formData = new FormData();
        formData.append("appointmentId", appointment.id);
        await submitTokenRequest();
    }



    useEffect(() => {
        if (tokenData?.success) {
            router.push(
                `/video-call?sessionId=${tokenData.videoSessionId}&token=${tokenData.token}&appointmentId=${appointment.id}`
            );
        }
    }, [tokenData, appointment.id]);
    
    return (
      <>
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
                        ? "bg-emerald-900/20 border-emerald-900/30 text-emerald-400 self-start"
                        : appointment.status === "CANCELLED"
                        ? "bg-red-900/20 border-emerald-900/30 text-red-400 self-start"
                        : "bg-amber-900/20 border-amber-900/30 text-amber-400 self-start"        
                        }
                    >
                    {appointment.status} 
                    </Badge>
                    <div className='flex gap-2 mt-2 flex-wrap'>
                        {canMarkCompleted() && (
                            <Button
                                size="sm"
                                onClick={handleMarkCompleted}
                                disabled={completeLoading}
                                className="bg-emerald-600 hover:bg-emerald-700">
                                {completeLoading ? (
                                    <Loader2 className='h-4 w-4 animate-spin'/>
                                ) : (
                                    <>
                                        <CheckCircle className='h-4 w-4 mr-1' />
                                        complete
                                    </>
                                )}
                            </Button>
                        )}
                        <Button
                            size="sm"
                            variant="outline"
                            className="border-emerald-900/30 cursor-pointer"
                            onClick={() => setOpen(true)}
                            >
                            View Details
                        </Button>
                    </div> 
                </div>
                </div>
            </CardContent>
            </Card>

            {/* Appointment Details Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-white">
                    Appointment Details
                    </DialogTitle>
                    <DialogDescription>
                    {appointment.status === "SCHEDULED"
                        ? "Manage your upcoming appointment"
                        : "View appointment information"}
                        </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    {/* Other Party Information */}
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">
                            {otherPartyLabel}
                        </h4>
                        <div className="flex items-center">
                            <div className="h-5 w-5 text-emerald-400 mr-2">
                                {otherPartyIcon}
                            </div>
                            <div>
                                <p className="text-white font-medium">
                                    {userRole === "DOCTOR"
                                    ? otherParty.name
                                    : `Dr. ${otherParty.name}`}
                                </p>
                                {userRole === "DOCTOR" && (
                                    <p className="text-muted-foreground text-sm">
                                        {otherParty.email}
                                    </p>
                                )}
                                    {userRole === "PATIENT" && (
                                        <p className='text-muted-foreground text-sm'>
                                            {otherParty.speciality}    
                                        </p>
                                )}    
                            </div>
                        </div>
                        </div>
                         {/* Appointment Time */}
                        <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">
                            Scheduled Time
                        </h4>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center">
                            <Calendar className="h-5 w-5 text-emerald-400 mr-2" />
                            <p className="text-white">
                                {formatDateTime(appointment.startTime)}
                            </p>
                            </div>
                            <div className="flex items-center">
                            <Clock className="h-5 w-5 text-emerald-400 mr-2" />
                            <p className="text-white">
                                {formatTime(appointment.startTime)} -{" "}
                                {formatTime(appointment.endTime)}
                            </p>
                            </div>
                        </div>
                        </div>
                         {/* Status */}
                        <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">
                            Status
                        </h4>
                        <Badge
                            variant="outline"
                            className={
                            appointment.status === "COMPLETED"
                                ? "bg-emerald-900/20 border-emerald-900/30 text-emerald-400"
                                : appointment.status === "CANCELLED"
                                ? "bg-red-900/20 border-red-900/30 text-red-400"
                                : "bg-amber-900/20 border-amber-900/30 text-amber-400"
                            }
                        >
                            {appointment.status}
                        </Badge>
                        </div>
                         {/* Patient Description */}
                        {appointment.patientDescription && (
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-muted-foreground">
                            {userRole === "DOCTOR"
                                ? "Patient Description"
                                : "Your Description"}
                            </h4>
                            <div className="p-3 rounded-md bg-muted/20 border border-emerald-900/20">
                            <p className="text-white whitespace-pre-line">
                                {appointment.patientDescription}
                            </p>
                            </div>
                        </div>
                        )}
                        {appointment.status == "SCHEDULED" && (
                            <div className='space-y-2'>
                                <h4 className='text-sm font-medium text-muted-foreground'>
                                    Video Consultation
                                </h4>
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 "
                                    disabled={
                                        !isAppointmentActive() || action === "video" || tokenLoading
                                    }
                                    onClick={handleJoinVideoCall}
                                >
                                    {tokenLoading || action === "video" ? (
                                        <>
                                            <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                            Preparing Video Call ...
                                        </>
                                    ) : (
                                            <>
                                                <Video className='h-4 w-4 mr-2'/>
                                                {isAppointmentActive()
                                                 ? "Join "
                                                
                                                
                                                }
                                            
                                            </>
                                )}    
                                </Button>
                            </div>
                        )}
                </div>    
            </DialogContent>
        </Dialog>       
    </>        
  )
}

export default AppointmentCard;