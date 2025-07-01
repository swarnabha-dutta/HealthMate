"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from 'zod';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';



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
                
                 {/* patient form */}
                <Card className="border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all" >
                    <CardContent className="pt-6 pb-6 flex flex-col gap-6 items-center text-center">
                    <div className='p-4 bg-emerald-900/20 rounded-full mb-4'>
                    <User className="h-8 w-8 text-emerald-400" />       
                    </div>    
                        <CardTitle
                        className="text-xl font-semibold text-white mb-2"
                        >Join as a Patient</CardTitle>
                        <CardDescription className="mb-4">
                            Book appointments, consult with doctors, and manage your
                            healthcare journey
                        </CardDescription>
                        <Button
                        className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700"
                        
                        >Continue as a Patient</Button>
                    </CardContent>
                </Card>
                {/* doctors form */}
                <Card className="border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all" >
                    <CardContent className="pt-6 pb-6 flex flex-col gap-6 items-center text-center">
                    <div className='p-4 bg-emerald-900/20 rounded-full mb-4'>
                    <Use className="h-8 w-8 text-emeald-400" />       
                    </div>    
                        <CardTitle
                        className="text-xl font-semibold text-white mb-2"
                        >Join as a Patient</CardTitle>
                        <CardDescription className="mb-4">
                            Book appointments, consult with doctors, and manage your
                            healthcare journey
                        </CardDescription>
                        <Button
                        className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700"
                        
                        >Continue as a Patient</Button>
                    </CardContent>
                </Card>
            </div>
            
            // doctors form 
            
        )
    }
    
    if (step === "doctor-form") {
        return <>Doctor-form</>
    }
    
    // Add a default return
    return null;
}

export default OnboardingPage