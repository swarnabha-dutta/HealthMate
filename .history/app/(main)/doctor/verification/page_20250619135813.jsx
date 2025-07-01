import { getCurrentUser } from '@/actions/onboarding'
import { redirect } from 'next/navigation';
import React from 'react'

const VerificationPage =async () => {
  
    const user = await getCurrentUser();
    if (user?.verificationStatus === "VERIFIED") {
        redirect("/doctor");
    }
  
    const isRejected = user?.verificationStatus === "REJECTED";

    return (
        <div className='container mx-auto px-4 py-12'>
            
        </div>
  )
}

export default VerificationPage