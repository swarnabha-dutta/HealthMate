import { verifyAdmin } from '@/actions/admin';
import { redirect } from 'next/navigation';
import React from 'react'

export const metadata = {
    title: "Admin Settings- HealthMate",
    description: "Manage Doctors,patients , and platform settings",
};


const AdminLayout =async () => {
  
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
        redirect
    }
  
  
    return (
    
    <div>AdminLayout</div>
  )
}

export default AdminLayout