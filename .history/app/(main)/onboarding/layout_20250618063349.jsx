import { getCurrentUser } from '@/actions/onboarding'
import React from 'react'


export const metadata = {
    title: "Onboarding - HealthMate",
    description: "Connect with doctors anytime,anywhere",
}





const OnboardingLayout =async ({children}) => {
    
    const user = await getCurrentUser();
    if (user) {
        if (user.role === "PATIENT") {
            redirect("/doctors");
        } else if (user.role === "DOCTOR") {
            if(user.VerificationStatus === "VERI")
        }
    }
    
    
    return (
    <div>{children}</div>
    )
}

export default OnboardingLayout