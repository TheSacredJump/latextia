import Link from 'next/link'
import React from 'react'
import { User } from 'lucide-react'
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs"

const Navbar = () => {
  return (
    <nav className='fixed top-16 left-1/2 -translate-x-1/2 flex justify-between items-center p-4 w-full max-w-7xl mx-auto rounded-full border bg-white/50 backdrop-blur-sm z-50'>
        <Link href="/" className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg'></div>
            <h1 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600'>Latextia</h1>
        </Link>
        <div className='flex items-center gap-8'>
            <Link href="/" className='text-neutral-600 hover:text-neutral-900 transition-colors'>
                Home
            </Link>
            <Link href="/#features" className='text-neutral-600 hover:text-neutral-900 transition-colors'>
                Features
            </Link>
            <Link href="/#about" className='text-neutral-600 hover:text-neutral-900 transition-colors'>
                About
            </Link>
            <SignedOut>
                <Link href="/sign-in" className='flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-green-600 to-emerald-600 text-white rounded-full hover:opacity-90 transition-opacity'>
                    <span>Sign In</span>
                    <User className='w-4 h-4' />
                </Link>
            </SignedOut>
            <SignedIn>
                <Link href="/dashboard" className='flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-full hover:opacity-90 transition-opacity'>
                    <span>Dashboard</span>
                </Link>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
        </div>
    </nav>
  )
}

export default Navbar