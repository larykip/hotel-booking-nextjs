import PitchCarousel from './PitchCarousel'

const PitchSection = () => {
  return (
    <section className='flex flex-col px-8 text-center md:text-left max-w-[1200px] mx-auto my-16'>
      <h1 className='text-xl md:text-3xl font-bold my-4 text-blue-700'>
        What we Offer
      </h1>
      <p>
        From cozy single rooms perfect for solo adventurers to spacious suites ideal for families or those seeking extra space and elegance, we have it all. Whether you're looking for a room with a view, a relaxing jacuzzi, or a cozy fireplace, we have the perfect room for you.
      </p>
      <div className='flex justify-center'>
          <PitchCarousel/>
      </div>
    </section>
  )
}

export default PitchSection
