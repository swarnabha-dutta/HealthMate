"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from 'zod';
import { Card } from '@/components/ui/card';


const doctorFormSchema = z.object({
    speciality: z.string().min(1, "Specialty is required"),
    experience: z
        .number()
        .min(1, "Experience must be at least 1 year")
        .max(70, "Experience must be less than 70 years"),

    credentialUrl: z
        .string()
        .url("Please enter a valid URL")
        .min(1, "Credential URL is required"),

    description: z
        .string()
        .min(1, "Description is required")
        .max(1000, "Description must be less than 1000 characters"),
})

const OnboardingPage = () => {
    const [step, setStep] = useState("choose-role");
    const { 
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm({
        resolver: zodResolver(doctorFormSchema),
        defaultValues: {
            speciality: "",
            experience: undefined,
            credentialUrl: "",
            description: "",
        }
    })
    const specialityValue = watch("speciality");
    
    if (step === "choose-role") {
        return <Card></Card>    
    }
    
    if (step === "doctor-form") {
        return <>Doctor-form</>
    }
    
    // Add a default return
    return null;
}

export default OnboardingPage