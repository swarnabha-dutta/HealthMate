import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'
import React from 'react'

const DoctorAppointmentsList = ({appointments}) => {
  return (
        <Card className="bg-emerald-900/20">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-white flex items-center">
                    <Calendar className="h-5 w-5 mr-2 text-emerald-400" />
                    Upcoming Appointments
                </CardTitle>
            </CardHeader>
            <CardContent>
                {appointments.length > 0 ? (
                    <div className='space-y-4'>
                        
                    </div>
                ):(
                    <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-xl font-medium text-white mb-2">
                        No upcoming appointments
                    </h3>
                    <p className="text-muted-foreground">
                        You don&apos;t have any scheduled appointments yet. Make sure you&apos;ve set your availability to allow patients to book.
                    </p>
                    </div>
                    )}
            </CardContent>
        </Card>
)
}

export default DoctorAppointmentsList