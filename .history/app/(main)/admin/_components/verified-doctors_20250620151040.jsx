import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const VerifiedDoctors = () => {
  return (
    <div>
          <Card className="bg-muted/20 border-emerald-900/20">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
              <CardTitle className="text-xl font-bold text-white">
                  Manage Doctors
              </CardTitle>
              <CardDescription>
                  View and manage all verified doctors
              </CardDescription>
              </div>
            </div>
            <CardAction>Card Action</CardAction>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
          </CardContent>
          
      </Card>
    </div>
  )
}

export default VerifiedDoctors  