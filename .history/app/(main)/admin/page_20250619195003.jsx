import { getPendingDoctors, getVerifiedDoctors } from '@/actions/admin'
import { TabsContent } from '@/components/ui/tabs'
import React from 'react'

const AdminPage = async () => {


    const [pendingDoctors, verifiedDoctors] = await Promise.all([
        getPendingDoctors(),
        getVerifiedDoctors()
    ])





  return (
    <>
            <TabsContent value="pending"className={"border-none p-0"}>
                <Pending
            </TabsContent>
            <TabsContent value="doctors">
                Doctors
            </TabsContent>
    </>
  )
}

export default AdminPage