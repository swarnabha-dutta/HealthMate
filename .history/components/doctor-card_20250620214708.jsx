import React from 'react'
import { Card, CardContent } from './ui/card'
import { Star, User } from 'lucide-react'
import { Badge } from './ui/badge'


const DoctorCard = ({doctor}) => {
  return (
        <Card className={"border-emerald-900/20 hover:border-emerald-700/40 transition-all"}>
            <CardContent>
                <div>
                    <div className='w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center flex-shrink-0'>
                        {doctor.imageUrl
                          ? (
                                <img
                                src={doctor.imageUrl}
                                alt={doctor.name}
                                className='w-12 h-12 rounded-full object-cover'
                                />
                          ) : (
                                <User className="h-6 w-6 text-emerald-400"/>
                          )
                        }
                      </div>
                      <div>
                      <div className='flex flex-col sm:flex-row sm:items-center        sm:justify-between gap-2 mb-2'>-900/20 border-emerald
                      <h3 className='font-medium text-white text-lg'>{doctor.name}</h3>
                      <Badge
                      variant="outline"
                      className={"bg-emerald-900/20 border-emerald-900/20 text-emerald-400 self-start"}
                      >
                      <Star className="h-3 w-3 mr-1" />
                      Verified
                      </Badge>
                    </div>
            
                </div>          
                </div>
            </CardContent>
        </Card>
  )
}

export default DoctorCard