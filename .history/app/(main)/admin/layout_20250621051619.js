import { verifyAdmin } from '@/actions/admin';
import PageHeader from '@/components/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, ShieldCheck, Users } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata = {
    title: "Admin Settings- HealthMate",
    description: "Manage Doctors,patients , and platform settings",
};


const AdminLayout =async ({children}) => {
  
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
        redirect("/onboarding");
    }
    return (
    
        <Tabs
            defaultValue="earnings"
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
            <TabsList className="md:col-span-1 bg-muted/30 border h-14 md:h-40 flex sm:flex-row md:flex-col w-full p-2 md:p-1 rounded-md md:space-y-2 sm:space-x-2 md:space-x-0">
                <TabsTrigger
                    value="earnings"
                    className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
                >
                    <DollarSign className="h-4 w-4 mr-2 hidden md:inline" />
                    <span>Earnings</span>
                </TabsTrigger>
                <TabsTrigger
                    value="appointments"
                    className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
                >
                    <Calendar className="h-4 w-4 mr-2 hidden md:inline" />
                    <span>Appointments</span>
                </TabsTrigger>
                <TabsTrigger
                    value="availability"
                    className="flex-1 md:flex md:items-center md:justify-start md:px-4 md:py-3 w-full"
                >
                    <Clock className="h-4 w-4 mr-2 hidden md:inline" />
                    <span>Availability</span>
                </TabsTrigger>
            </TabsList>
            <div className="md:col-span-3">
                <TabsContent value="appointments" className="border-none p-0">
                    <DoctorAppointmentsList
                        appointments={appointmentsData.appointments || []}
                    />
                </TabsContent>
                <TabsContent value="availability" className="border-none p-0">
                    <AvailabilitySettings slots={availabilityData.slots || []} />
                </TabsContent>
                <TabsContent value="earnings" className="border-none p-0">
                    
                </TabsContent>
            </div>
        </Tabs>
    )
}

export default AdminLayout