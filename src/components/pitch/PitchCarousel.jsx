import Image from 'next/image'

const data = [
    {
        id: 1,
        title: 'Standard double room',
        image: '/images/room1.jpg'
    },
    {
        id: 2,
        title: 'Junior suite',
        image: '/images/room2.jpg'
    },
    {
        id: 3,
        title: 'Executive suite',
        image: '/images/room3.jpg'
    },
    {
        id: 4,
        title: 'Presidential suite',
        image: '/images/room4.jpg'
    },
    {
        id: 5,
        title: 'Fine dining restaurant',
        image: '/images/restaurant.jpg'
    },
    {
        id: 6,
        title: 'Beachfront pool',
        image: '/images/pool.jpg'
    },
]

const PitchCarousel = () => {
  return (
    <section className='flex flex-wrap w-full justify-center items-center'>
        {data.map((item) => (
            <div key={item.id} className='flex relative w-[250px] h-[400px] min-w-[250px] m-4'>
                <Image className='rounded-lg' src={item.image} alt={item.title} fill />
                <div className='absolute w-full text-white font-bold text-center bottom-0 z-10 my-2 py-2 bg-black/50'>
                    <h2>{item.title}</h2>
                </div>
            </div>
        ))}
    </section>
  )
}

export default PitchCarousel
