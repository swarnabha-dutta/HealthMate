import React from 'react'
import { Card, CardContent } from './ui/card'

const DoctorCard = ({doctor}) => {
  return (
        <Card className={"border-emerald-900/20 hover:border-emerald-700/40 transition-all"}>
            <CardContent>
                <div>
                    <div className='w-12 h-12 rounded-full bg-emerald-900/20 flex items-center justify-center flex-shrink-0'>
            {doctor.imageUrl ? (
              <img
              
              
              
              />
                    )
              
                    }
                    </div>
                </div>
            </CardContent>
        </Card>
  )
}

export default DoctorCard