import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'

const DoctorProfile = ({doctor,availableDays}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <div className='md:sticky md:top-24'>
            <Card className="border-emerald-900/20">
              <CardContent className="pt-6">
                  <div>
                    <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 bg-emerald-900/20">
                    {doctor.imageUrl ? (
                    <Image
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      fill
                      className='object-cover'
                    /> 
                    ): (
                      
                        )}
                    </div>
                  </div> 
              </CardContent>
            </Card>
        </div>
      </div>
      <div className="md:col-span-2 space-y-6"></div>
    </div>
  )
}

export default DoctorProfile