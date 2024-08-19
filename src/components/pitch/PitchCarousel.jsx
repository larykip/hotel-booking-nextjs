import Image from 'next/image'

const data = [
    {
        id: 1,
        title: 'Flowers @ heart!',
        image: '/images/flowers.jpg'
    },
    {
        id: 2,
        title: 'Pancakes in it!',
        image: '/images/pancakes.jpg'
    },
    {
        id: 3,
        title: 'Pizza Mojo',
        image: '/images/pizza.jpg'
    },
    {
        id: 4,
        title: 'Super woman',
        image: '/images/woman.png'
    },
]

const PitchCarousel = () => {
  return (
    <>
        {data.map((item) => (
            <div key={item.id} className='flex relative w-[300px] h-[400px] m-4'>
                <Image src={item.image} fill />
                <div className='absolute w-full text-white text-center bottom-0 z-10'>
                    <h2>{item.title}</h2>
                </div>
            </div>
        ))}
    </>
  )
}

export default PitchCarousel
