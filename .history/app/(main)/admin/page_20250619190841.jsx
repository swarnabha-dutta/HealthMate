import { TabsContent } from '@/components/ui/tabs'
import React from 'react'

const AdminPage = () => {
  return (
    <div>
            <TabsContent value="pending">
                Pending
            </TabsContent>
            <TabsContent value="doctors">
                Change your password here.
            </TabsContent>
    </div>
  )
}

export default AdminPage