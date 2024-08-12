import Image from 'next/image'
import React from 'react'
// export const dynamic = 'force-dynamic'

const HeroSection = () => {
  return (
    <section className='flex'>
      <div>
        <Image src='https://cdn.pixabay.com/photo/2023/12/15/03/11/basket-to-the-sea-8449952_1280.jpg' width={500} height={500} alt='logo'/>
      </div>
      <div className='flex flex-col items-center'>
        <h1>Hero Section</h1>
        <button>Hero Section</button>
      </div>
    </section>
  )
}

export default HeroSection
