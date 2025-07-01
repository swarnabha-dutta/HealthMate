import { TabsContent } from '@/components/ui/tabs'
import React from 'react'

const AdminPage = () => {
  return (
    <div>
            <TabsContent value="pending">
                Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
                Change your password here.
            </TabsContent>
    </div>
  )
}

export default AdminPage