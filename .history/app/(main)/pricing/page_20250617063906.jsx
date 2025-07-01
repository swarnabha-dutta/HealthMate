import Link from 'next/link'
import React from 'react'

const PricingPage = () => {
    return (
        <div>
            <div className="flex justify-start mb-2">
                <Link
                href="/"
                className="flex items-center text-muted-foreground hover:text-white transition-colors"
                >
                    <ArrowLeft
                </Link>
            </div>
        </div>
    )

}
export default PricingPage