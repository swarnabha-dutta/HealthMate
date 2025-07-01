import { verifyAdmin } from '@/actions/admin';
import React from 'react'

export const metadata = {
    title: "Admin Settings- HealthMate",
    description: "Manage Doctors,patients , and platform settings",
};


const AdminLayout =async () => {
  
    const isAdmin = await verifyAdmin();
    
  
  
    return (
    
    <div>AdminLayout</div>
  )
}

export default AdminLayout