import { verifyAdmin } from '@/actions/admin';
import PageHeader from '@/components/page-header';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, ShieldCheck, Users } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata = {
    title: "Admin Settings- HealthMate",
    description: "Manage Doctors,patients , and platform settings",
};


const AdminLayout =async ({children}) => {
  
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
        redirect("/onboarding");
    }
    return (
    
        <div className='container mx-auto px-4 py-8'>
            <PageHeader icon={<ShieldCheck />} title="Admin Settings" />
            <Tabs
                defaultValue="account"
                className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <TabsList className={"md:col-span-1 bg-muted/30 border h-14 md:h-28 flex sm:flex-row md:flex-col w-full p-2 md:p-1 rounded-md md:space-y-2 sm:space-x-2 md:space-x-0"}>
                    <TabsTrigger value="pending">
                        <AlertCircle className='h-4 w-4 mr-2 hidden md:inline'/>
                        <span>Pending Verification</span>
                    </TabsTrigger>
                    <TabsTrigger value="doctors">
                        <Users className="h-4 w-4 mr-2 hidden md:inline"/>
                        <span>Doctors</span>
                    </TabsTrigger>
                </TabsList>
                
                <div className='md:col-span-3'>
                    {children}
                </div>
                
            </Tabs>
        </div>
    )
}

export default AdminLayout