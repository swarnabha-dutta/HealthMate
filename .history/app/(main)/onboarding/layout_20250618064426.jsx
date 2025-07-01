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
            if (user.VerificationStatus === "VERIFIED") {
                redirect("/doctor");
            } else {
                redirect("/doctor/verification");
            }
        } else if (user.role === "ADMIN") {
            redirect("/admin");
        }
    }
    
    
    return (
        <div className='container mx-auto px-12 py-12'>
            <div className='max-w-3xl mx-auto'>
                <div className='text-center mb-10'>
                    <h1>Welcome to HealthMate</h1>
                    <p> Tell us how you want to use the platform</p>
                </div>
            {children}
            </div>
        </div>
    )    
}

export default OnboardingLayout