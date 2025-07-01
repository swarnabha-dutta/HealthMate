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
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    <TabsTrigger value="account">
                        <AlertCircle className='h-4 w-4 mr-2 hidden md:inline'/>
                        <span>Pending Verification</span>
                    </TabsTrigger>
                    <TabsTrigger value="password">
                        <Users className="h-4 w-4 mr-2 hidden md:inline"/>
                        <span>Doctors</span>
                    </TabsTrigger>
                </TabsList>
                {children}
            </Tabs>
        </div>
    )
}

export default AdminLayout