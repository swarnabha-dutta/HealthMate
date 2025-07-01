import React from 'react'
import { Card, CardContent } from './ui/card'
import { PricingTable } from '@clerk/nextjs'

const Pricing = () => {
  return (
      <Card>
        <CardContent>
            <PricingTable/>
        </CardContent>
    </Card>
  )
}

export default Pricing