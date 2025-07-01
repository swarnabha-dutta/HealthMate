"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { doctorFormSchema } from '@/lib/schema';



const doctorFormSchema = z.object


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