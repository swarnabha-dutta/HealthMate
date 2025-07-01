import { verifyAdmin } from '@/actions/admin';
import PageHeader from '@/components/page-header';
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata = {
    title: "Admin Settings- HealthMate",
    description: "Manage Doctors,patients , and platform settings",
};


const AdminLayout =async () => {
  
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
        redirect("/onboarding");
    }
  
  
    return (
    
        <div className='container mx-auto px-4 py-8'>
            <PageHeader icon={/>
        </div>
  )
}

export default AdminLayout