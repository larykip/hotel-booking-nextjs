import Image from 'next/image'
import React from 'react'
import { Button } from "@/components/ui/button"

// export const dynamic = 'force-dynamic'

const HeroSection = () => {
  return (
    <section className='flex justify-between bg-red-700'>
      {/* Hero Image */}
      <div className='basis-1/2 relative w-[500px] h-[500px]'>
        <Image src='https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' fill alt='logo'/>
      </div>
      
      {/* Hero Text */}
      <div className='flex flex-col basis-1/2 justify-center items-center'>
        <h1 className='text-3xl m-3'>Hero Section</h1>
        <Button className="">Find Rooms</Button>
      </div>
    </section>
  )
}

export default HeroSection
