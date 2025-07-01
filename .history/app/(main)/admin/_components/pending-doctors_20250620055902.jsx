"use client"

import { updateDoctorStatus } from '@/actions/admin';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useFetch from '@/hooks/use-fetch';
import React, { useState } from 'react'

const PendingDoctors = ({doctors}) => {

  const {
    loading,
    data,
    fn: submitStatusUpdate
  } = useFetch(updateDoctorStatus);


  const [selectedDoctor, setSelectedDoctor] = useState(null);
  return (
    <div>
      <Card className="bg-muted/20 border-emerald-900/20">
          <CardHeader className="text-white text-xl font-bold" >
            <CardTitle>Pending Doctor Verification</CardTitle>
            <CardDescription>Review and Approve doctor applications</CardDescription>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
          {doctors.length === 0 ? (
            <div className='text-center py-8 text-muted-foreground'>
            No Pending verification requests at this time. 
            </div>) : (
              <div className='space-y-4'>
                {doctors.map(doctor => {
                  <Card
                    key={doctor.id}
                    className={"bg-background border-emerald-900/20 hover:border-emerald-700/30 transition-all"}
                  
                  >
                    <CardContent className={"p-4"}>  
                      <div>
                        <div>
                          <div></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                })}
            </div>)}
          </CardContent>
      </Card>
    </div>
  )
}

export default PendingDoctors