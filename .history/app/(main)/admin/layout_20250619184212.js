import { verifyAdmin } from '@/actions/admin';
import PageHeader from '@/components/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldCheck } from 'lucide-react';
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
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                
            </Tabs>
        </div>
  )
}

export default AdminLayout