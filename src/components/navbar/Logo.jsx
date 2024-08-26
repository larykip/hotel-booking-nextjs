import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <>
      <Link href='/' className='flex items-center'>
        <Image 
            src='/images/logo.jpg' 
            width={100} 
            height={100} 
            alt='logo' 
            priority
          />
        {/* <h2>Metro Manor</h2> */}
      </Link>
    </>
  )
}

export default Logo
