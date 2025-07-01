import { getPendingDoctors } from '@/actions/admin'
import { TabsContent } from '@/components/ui/tabs'
import React from 'react'

const AdminPage = () => {


  conts   Promise.all([
        getPendingDoctors(),
        getVerifiedDoctors()
    ])





  return (
    <div>
            <TabsContent value="pending">
                Pending
            </TabsContent>
            <TabsContent value="doctors">
                Doctors
            </TabsContent>
    </div>
  )
}

export default AdminPage