"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { doctorFormSchema } from '@/lib/schema';
import { z } from 'zod';



const doctorFormSchema = z.object({
    speciality: z.string().min(1, "Specialty is required"),
    experience: z
        .number()
        .min(1, "Experience must be at least 1 year")

})


const OnboardingPage = () => {

    const [step, setStep] = useState("choose-role");

    const { }=useForm({
        resolver:zodResolver(doctorFormSchema)
    })
    return (

        <div>OnboardingLayout</div>
    )
}

export default OnboardingPage