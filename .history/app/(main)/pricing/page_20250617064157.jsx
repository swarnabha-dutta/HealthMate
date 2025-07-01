import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const PricingPage = () => {
    return (
        <div className=''>
            <div className="flex justify-start mb-2">
                <Link
                href="/"
                className="flex items-center text-muted-foreground hover:text-white transition-colors"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                </Link>
            </div>
            <div></div>
        </div>
    )

}
export default PricingPage