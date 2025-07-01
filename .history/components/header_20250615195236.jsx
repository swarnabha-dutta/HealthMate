import { SignedIn, SignedOut, SignInButton,  UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { checkUser } from '@/lib/checkUser'
import { Badge, User } from 'lucide-react'
import { checkAndAllocateCredits } from '@/actions/credits'

const Header = async() => {

  const user = await checkUser();
  if (user?.role === "PATIENT") { 
    await  checkAndAllocateCredits(user);
  }
  return (
    <header className='fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-10 supports-[backdrop-filter]:bg-background/60'>
        <nav className='container mx-auto px-4 h-16 flex items-center justify-between'>
            <Link  href="/">
                <Image
                    src="/logo-single.png"
                    alt='HealthMate Logo'
                    width={200}
                    height={60}
                    className='h-10 w-auto object-contain'
                />
        </Link>
        {/* Actions Button */}
        <div className='flex items-center space-x-2'>
          <SignedIn>
            {user?.role === "UNASSIGNED"&& (
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex sm:inline-flex items-center gap-2"
                >
                  <User className='h-4 w-4' />
                  Complete Profile
                </Button>
                <Button
                  variant="ghost"
                  className="md:hidden w-10 h-10 p-0"
                >
                  <User className='h-4 w-4' />
                </Button>
              </Link>
            )}
          </SignedIn>
          {(!user || user?.role === "PATIENT")&&(
            <Badge
              variant="outline"
              className='bg-emerald-900/30 bg-emerald-700/30 px-4 py-2 text-emerald-400 text-sm font-medium '
            />
            )}
          





            <SignedOut>
              <SignInButton>
                <Button variant="secondary">Sign In</Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier:"font-semibold"
              },
              }} />
            </SignedIn>
            </div>

        </nav>
    </header>
)
}

export default Header