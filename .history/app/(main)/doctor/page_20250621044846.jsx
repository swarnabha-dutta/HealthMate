import { getDoctorAppointments, getDoctorAvailability } from '@/actions/doctor';
import { getCurrentUser } from '@/actions/onboarding'
import { TabsContent } from '@/components/ui/tabs';
import { VerificationStatus } from '@prisma/client';
import { Calendar, Clock } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'

const DoctorDashboard = async () => {
    const user = await getCurrentUser();
    
    const [appointmentData, availabilityData] = await Promise.all([
    getDoctorAppointments(),
        getDoctorAvailability()
    ]);
    
    
    if (user?.role !== "DOCTOR") {
        redirect("/onboarding");
    }
    // If user verified redirect to dashboard
    if (user?.verificationStatus !== "VERIFIED") {
        redirect("/doctor/verification");
    }
  return (
    <Tabs
    defaultValue="appointments"
    className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <TabsList className={"md:col-span-1 bg-muted/30 border h-14 md:h-28 flex sm:flex-row md:flex-col w-full p-2 md:p-1 rounded-md md:space-y-2 sm:space-x-2 md:space-x-0"}>
            <TabsTrigger
                value="appointments"
                className={"flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"}
            >
                <Calendar className='h-4 w-4 mr-2 hidden md:inline'/>
                <span className='text-sm font-medium text-center'>Appointments</span>
            </TabsTrigger>
            <TabsTrigger
                value="availability"
                className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
            >
                <Clock className="h-full mr-2 hidden md:inline w-full"/>
                <span>Availability</span>
            </TabsTrigger>
        </TabsList>
        <TabsContent value="appointments">Todo</TabsContent>
        <TabsContent value="availability" className={"border-none p-0"}></TabsContent>
    
    </Tabs>
  )
}

export default DoctorDashboard