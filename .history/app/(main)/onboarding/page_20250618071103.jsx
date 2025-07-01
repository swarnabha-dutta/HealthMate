"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {zodeRes}
const OnboardingPage = () => {

    const [step, setStep] = useState("choose-role");

    const { }=useForm({
        resolver:zodResolver
    })
    return (

        <div>OnboardingLayout</div>
    )
}

export default OnboardingPage