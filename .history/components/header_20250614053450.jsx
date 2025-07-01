import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
    <header>
        <nav>
            <Link  href="/">
                <Image src="/public/"/>
            </Link>
        </nav>
    </header>
<nav>
</nav>  )
}

export default Header