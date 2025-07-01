"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod"
import { z } from 'zod';
import { Card,CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Stethoscope, User } from 'lucide-react';
import useFetch from '@/hooks/use-fetch';
import { setUserRole } from '@/actions/onboarding';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SPECIALTIES } from '@/lib/specialities';
import { Input } from '@/components/ui/input';




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
    const router = useRouter();
   const {data,fn:submitUserRole,loading}= useFetch(setUserRole)
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
    
    const handlePatientSelection = async () => {
        if(loading) return;
        const formData = new FormData();
        formData.append("role", "PATIENT");

        await submitUserRole(formData);
    }

    useEffect(() => {
        if (data && data?.success) {
            toast.success("Role Selected Successfully");
            router.push(data.redirect);
        }
    }, [data]);


    if (step === "choose-role") {
        return ( 
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                 {/* patient form */}
                <Card
                    onClick={()=> !loading && handlePatientSelection()}
                    
                    className="border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all" >
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
                        <Button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700"
                        disabled={loading}
                        >{loading ? (
                            <>
                                <Loader2 className='h-4 w-4 animate-spin' />
                                Processing...
                            </>
                            ) : (
                                "Continue as a Patient"
                            )
                        }
                        </Button>
                    </CardContent>
                </Card>
                {/* doctors form */}
                <Card
                    onClick={() =>!loading &&  setStep("doctor-form")}
                    
                    className="border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all" >
                    <CardContent className="pt-6 pb-6 flex flex-col gap-6 items-center text-center">
                    <div className='p-4 bg-emerald-900/20 rounded-full mb-4'>
                    <Stethoscope className="h-8 w-8 text-emerald-400" />       
                    </div>    
                        <CardTitle
                        className="text-xl font-semibold text-white mb-2"
                        >Join as a Doctor</CardTitle>
                        <CardDescription className="mb-4">
                        Create your professional profile, set your availability, and
                        provide consultations
                        </CardDescription>
                        <Button
                        disabled={loading}    
                        className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700"
                        
                        >Continue as a Doctor</Button>
                    </CardContent>
                </Card>
            </div>
            
            // doctors form 
            
        )
    }
    
    if (step === "doctor-form") {
        return (
                <Card
                    onClick={() =>!loading &&  setStep("doctor-form")}
                    className="border-emerald-900/20" >
                <CardContent className="pt-6">
                    <div className='mb-6'>
                        <CardTitle
                        className="text-2xl font-bold text-white mb-2"
                        >Complete Your Doctor Profile</CardTitle>description
                        <CardDescription className="mb-4">
                        Please provide your professional details for verification
                        </CardDescription>
                    </div>    
                    <form action="" className="space-y-6">
                        <div className='space-y-2'>
                            <Label htmlFor="speciality">Medical speciality</Label>
                            <Select
                            value={specialityValue}
                            onValueChange={(value) => setValue("speciality", value)}
                            >
                            <SelectTrigger id="speciality">
                                <SelectValue placeholder="Select your speciality" />
                            </SelectTrigger>
                                <SelectContent>
                                    {SPECIALTIES.map((spec) => {
                                        return (
                                            <SelectItem value={spec.name} key={spec.name}>
                                            <div className="flex items-center gap-2">
                                                <span className='text-emerald-400'>{spec.icon}</span>
                                                {spec.name}
                                            </div>
                                            </SelectItem>);
                                    })}
                            </SelectContent>
                            </Select>
                            {errors.speciality && <p className="text-red-500 text-sm font-medium ">{errors.speciality.message}</p>}
                        </div>

                        {/*  Experience Input Section          */}
                        <div className='space-y-2'>
                            <Label htmlFor="experience">Years of Experience</Label>
                            <Input
                            id="experience"
                            type="number"
                            placeholder="eg. 5"
                            {...register("experience",{valueAsNumber:true})}
                            />

                            {errors.experience && <p className="text-red-500 text-sm font-medium ">{errors.experience.message}</p>}
                        </div>                
                        {/* CredentialUrls Input Section */}
                        <div className='space-y-2'>
                            <Label htmlFor="credentialUrl">Link to Credential Documents</Label>
                            <Input
                            id="credentialUrl"
                            type="url"
                            placeholder="https://example.com/my-mediacal-degree.pdf"
                            {...register("credentialUrl")}
                            />

                            {errors.experience && (<p className="text-red-500 text-sm font-medium ">{errors.experience.message}</p>)}
                            <p className="text-sm text-muted-foreground">
                                Please provide a link to your medical degree or certification
                            </p>
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="description">Description of Your Services</Label>
                                <Textarea
                                id="description"
                                placeholder="Describe your expertise, services, and approach to   patient care..."
                                rows="4"
                                {...register("description")}
                                />
                                {errors.description && (
                                  <p className="text-sm font-medium text-red-500 mt-1">
                                    {errors.description.message}
                                  </p>
                                )}
                            </div>

                    </form>
                    </CardContent>
                </Card>
        );
    }
    
    // Add a default return
    return null;
}

export default OnboardingPage