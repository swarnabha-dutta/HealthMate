"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import {zodeResolver} from "@hookform/resolvers/zod"
const OnboardingPage = () => {

    const [step, setStep] = useState("choose-role");

    const { }=useForm({
        resolver:zodeResolver
    })
    return (

        <div>OnboardingLayout</div>
    )
}

export default OnboardingPage