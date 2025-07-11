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
    
    
    return <div>
        <div>

        </div>
        
       </div>
}

export default OnboardingLayout