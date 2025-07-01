import React from 'react'
import { Card, CardContent } from './ui/card'
import { PricingTable } from '@clerk/nextjs'

const Pricing = () => {
  return (
      <Card className="border-e-emerald-900/30 shadow-lg bg-gradient-to-b from-emerald-950/30 to-tra">
        <CardContent className="p-6 md:p-8">
            <PricingTable/>
        </CardContent>
    </Card>
  )
}

export default Pricing