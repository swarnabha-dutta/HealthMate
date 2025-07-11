import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header>
        <nav>
            <Link  href="/">
                <Image
                    src="/public/logo.jpg"
                    alt='HealthMate Logo'
                    width={200}
                    height={60}
                    className='h-10 w-auto '
                />
            </Link>
        </nav>
    </header>
)
}

export default Header