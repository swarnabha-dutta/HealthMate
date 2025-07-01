import React from 'react'
import { Card, CardContent } from './ui/card'
import { PricingTable } from '@clerk/nextjs'

const Pricing = () => {
  return (
      <Card className="border-e-emerald-900/30 ">
        <CardContent className="p-6 md:p-8">
            <PricingTable/>
        </CardContent>
    </Card>
  )
}

export default Pricing