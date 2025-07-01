import { getCurrentUser } from '@/actions/onboarding'
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck, XCircle } from 'lucide-react';
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
                <Card className="border-emerald-900/20"> 
                    <CardHeader className="text-center">

                        <div className={`mx-auto p-4 ${
                            isRejected ? "bg-red-900/20" : "bg-amber-900/20"} rounded-full mb-4 w-fit`}>
                            {isRejected ? (
                                <XCircle className='h-8 w-8 text-red-400'/>
                            ) : (
                                    <ClipboardCheck className='h-8 w-8 text-amber-400'/>
                            )}
                        </div>
                        <CardTitle className={"text-2xl font-bold text-white"}>
                            {}
                    </CardTitle>
                      <CardDescription>Card Description</CardDescription>
                      <CardAction></CardAction>
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