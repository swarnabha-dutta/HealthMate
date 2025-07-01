"use client";


import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronDown, ChevronUp, Medal } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const DoctorProfile = ({doctor,availableDays}) => {

  const [showBooking, setShowBooking] = useState(false);
  const [selectedSlot,setSelectedSlot] = useState(null);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  }
  const totalSlots = availableDays.reduce((total, day) => total + day.slots.length, 0);





  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <div className='md:sticky md:top-24'>
            <Card className="border-emerald-900/20">
              <CardContent className="pt-6">
                  <div className='flex flex-col items-center text-center'>
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-emerald-900/20">
                    {doctor.imageUrl ? (
                    <Image
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      fill
                      className='object-cover'
                    /> 
                      ): (
                      <div className='w-full h-full flex items-center justify-center'>
                          <User className="w-16 h-16 text-emerald-500"/>
                      </div>
                    )}
                    </div>
                    <h2 className="text-xl font-bold text-white mb-1">
                      Dr.{doctor.name}
                    </h2>
                    <Badge
                    className={"bg-emerald-900/20 border-emerald-900/30 text-emerald-400 mb-4"}
                    >
                  {doctor.speciality}
                </Badge>
                <div className="flex items-center justify-center text-emerald-400 mb-4">
                    <Medal className="text-emerald-400 h-4 w-4 mr-2"/>
                  <span className='text-muted-foreground'>
                    {doctor.experience} years of experience
                    </span>
                </div>
                <Button className={"w-full bg-emerald-600 hover:bg-emerald-700 mt-4 cursor-pointer"}>
                  {showBooking ? (
                    <>
                      Hide Booking
                      <ChevronUp className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                      <>
                        Book Appointment 
                        <ChevronDown className="/>
                      </>
                  )}
                </Button>
                  </div> 
              </CardContent>
            </Card>
        </div>
      </div>
      <div className="md:col-span-2 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle
          className="text-xl font-bold text-white"
          >
            About Dr. {doctor.name}
          </CardTitle>
          <CardDescription>{doctor.speciality}</CardDescription>
          
        </CardHeader>
        <CardContent>
            {totalSlots > 0 ?
              <>
              
              </>
              :
              <div>
              
              </div>}
        </CardContent>
      </Card> 
      </div>
    </div>
  )
}

export default DoctorProfile