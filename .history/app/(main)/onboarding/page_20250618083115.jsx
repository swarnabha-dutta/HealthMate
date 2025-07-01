"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from 'zod';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';


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
        return ( 

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Card>
                    <CardContent>
                    <CardTitle>Join as a Patient</CardTitle>
                        <CardDescription>
                            Book appointments, consult with doctors, and manage your
                            healthcare journey
                        </CardDescription>
                        <Button>Continue as a Patient</Button>
                    </CardContent>
                </Card>
            </div>      
        )
    }
    
    if (step === "doctor-form") {
        return <>Doctor-form</>
    }
    
    // Add a default return
    return null;
}

export default OnboardingPage