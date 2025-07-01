import { Card } from '@/components/ui/card'
import React from 'react'

const VerifiedDoctors = () => {
  return (
    <div>
          <Card className="bg-muted/20 border">
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Card Description</CardDescription>
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