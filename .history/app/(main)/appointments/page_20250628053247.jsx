import { getCurrentUser } from '@/actions/onboarding'
import { getPatientAppointments } from '@/actions/patient';
import PageHeader from '@/components/page-header';
import { Calendar } from 'lucide-react';
import React from 'react'

const PatientAppointmentPage = async () => {
    const user = await getCurrentUser();
    if (!user || user.role !== "PATIENT") {
        redirect("/onboarding");
    }

    const { appointments, error } = await getPatientAppointments();


  return (
        <div className='container mx-auto px-4 py-8'>
            <PageHeader
            icon={<Calendar/>}
            title="My Appointments"        
            backLink="/doctors"
            backLabel="Find Doctors"    
            />
          
                        <Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
        </div>
  )
}

export default PatientAppointmentPage