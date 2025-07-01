import { getCurrentUser } from '@/actions/onboarding'
import React from 'react'


export const metadata = {
    title: "Onboarding - HealthMate",
    description: "Connect with doctors anytime,anywhere",
}





const OnboardingLayout =async ({children}) => {
    return (
    
    const user = await getCurrentUser    
    <div>{children}</div>
    )
}

export default OnboardingLayout