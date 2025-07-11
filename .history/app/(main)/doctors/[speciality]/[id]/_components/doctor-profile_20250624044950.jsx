import { Badge } from '@/components/ui/badge'
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
                <div className="flex items-center kjustify-e">

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