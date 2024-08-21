import Image from 'next/image'
import { Button } from "@/components/ui/button"

// export const dynamic = 'force-dynamic'

const HeroSection = () => {
  return (
    <section className='flex justify-between'>
      {/* Hero Image */}
      <div className='basis-1/2 relative w-[500px] h-[500px] '>
        <Image className='rounded-lg' src='https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' fill alt='hero'/>
      </div>
      
      {/* Hero Text */}
      <div className='flex flex-col basis-1/2 justify-center items-center text-center'>
        <h1 className='text-3xl font-bold m-3 text-blue-700'>Looking for comfort & luxury in your next getaway?</h1>
        <h2 className='text-lg mb-3'>We offer a variety of room options to suit every traveler's needs.</h2>
        <Button className="">Explore</Button>
      </div>
    </section>
  )
}

export default HeroSection
