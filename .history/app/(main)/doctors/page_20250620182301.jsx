import { SPECIALTIES } from '@/lib/specialities'
import Link from 'next/link'
import React, { Children } from 'react'

const SpecialtiesPage = () => {
    return (
        <>
            <div className='flex flex-col items-center justify-center mb-8 text-center'>
                <h1 className='text-3xl font-bold text-white mb-2'>Find Your Doctor</h1>
                <p className='text-muted-foreground text-lg'>
                Browse by specialty or view all available healthcare providers
                </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {SPECIALTIES.map((speciality) => (
                    <Link href={`/doctors/${speciality}`}></Link>
                ))}
            </div>
        </>  
    )
}

export default SpecialtiesPage