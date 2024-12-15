import React from 'react'
import Link from 'next/link'
import { auth  } from '@clerk/nextjs/server'
import { UserButton } from '@clerk/nextjs'

const Header =  async () => {
    const { userId } = await auth();
    console.log(userId);
    
  return (
    <>
    <nav className='bg-blue-700 py-4 px-6 flex items-center justify-between mb-5'>
        <div className="flex items-center">
            <Link href="/">
                <div className="text-lg uppercase font-bold text-white"> 
                    CoursePass
                </div>
            </Link>
        </div>
        <div className='text-white'>
            {!userId && (
                <>
                    <Link href='sign-in' className='text-gray-300 hover:text-white mr-4'>
                        Sign-In
                    </Link>
                    <Link href='sign-up' className='text-gray-300 hover:text-white mr-4'>
                        Sign-Up
                    </Link>
                </>

            )} 
            <div className="ml-auto">
                <UserButton afterSignedOutUrl='/'/>
            </div>
            

        </div>
       
    </nav>

    </>
  )
}

export default Header