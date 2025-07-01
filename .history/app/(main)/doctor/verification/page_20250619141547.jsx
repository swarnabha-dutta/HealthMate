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
            <div className='max-w-2xl mx-auto'>
                <Card className="border-emerald"> 
             <CardHeader>
               <CardTitle>Card Title</CardTitle>
               <CardDescription>Card Description</CardDescription>
               <CardAction>Card Action</CardAction>
             </CardHeader>
             <CardContent>
               <p>Card Content</p>
             </CardContent>
            </Card>
            </div>
        </div>
  )
}

export default VerificationPage