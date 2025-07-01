import React from 'react'
import { Card, CardContent } from './ui/card'
import { PricingTable } from '@clerk/nextjs'

const Pricing = () => {
  return (
      <Card className="border-e-emerald-900/30 shadow-lg bg-gradient-to-b from-emerald-950/30 to-transparent">
        <CardContent className="p-6 md:p-8">
              <PricingTable checkoutProps={{
                  appearance: {
                      elements: {
                          drawerRoot: {
                            zI
                        }
                    }
                }
            }}/>
        </CardContent>
    </Card>
  )
}

export default Pricing