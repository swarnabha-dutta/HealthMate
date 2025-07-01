import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const PricingPage = () => {
    return (
        <div className='container mx-auto px-4 py-12'>
            <div className="flex justify-start mb-2">
                <Link
                href="/"
                className="flex items-center text-muted-foreground hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>
            </div>
            <div>
                <Badge
            </div>
        </div>
    )

}
export default PricingPage