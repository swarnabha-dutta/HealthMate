import { getPendingDoctors, getVerifiedDoctors } from '@/actions/admin'
import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import PendingDoctors from './_components/pending-doctors'
import VerifiedDoctors from './_components/verified-doctors'

const AdminPage = async () => {


    const [pendingDoctors, verifiedDoctors] = await Promise.all([
        getPendingDoctors(),
        getVerifiedDoctors()
    ])





  return (
    <>
            <TabsContent value="pending"className={"border-none p-0"}>
                <PendingDoctors doctors={pendingDoctors.doctors || []}/>
            </TabsContent>
            <TabsContent value="doctors">
                <VerifiedDoctors doctors={verifiedDoctors.doctors || []}/>
            </TabsContent>
    </>
  )
}

export default AdminPage