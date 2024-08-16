import React from 'react'

const Footer = () => {
  return (
    <div className=' border border-t-slate-400 flex flex-col w-full items-center mt-4 gap-y-2 bg-slate-300'>
      <section>
        <button className='bg-black text-white py-2 px-3 rounded-2xl'>Back to Top</button>
      </section>
      <section className='flex justify-around w-full'>
        <div>
            <h2 className='m-2 font-bold ml-0 t'>Support</h2>
            <ul className='space-y-2'>
                <li><a>Help Center</a></li>
                <li><a>AirCover</a></li>
                <li>Disability Support<a></a></li>
                <li><a>Cancellation Options</a></li>
                <li><a>Anti-Discrimination</a></li>
            </ul>
        </div>
        <div><h2>Support</h2>
            <ul className='gap-y-2'>
                <li><a>Help Center</a></li>
                <li><a>AirCover</a></li>
                <li>Disability Support<a></a></li>
                <li><a>Cancellation Options</a></li>
                <li><a>Anti-Discrimination</a></li>
            </ul></div>
        <div>
        <h2>Support</h2>
            <ul className='gap-y-2'>
                <li><a>Help Center</a></li>
                <li><a>AirCover</a></li>
                <li>Disability Support<a></a></li>
                <li><a>Cancellation Options</a></li>
                <li><a>Anti-Discrimination</a></li>
            </ul>
        </div>
      </section>
      <section className='flex justify-around w-full'>
        <div className='flex space-x-2'>
            <p>Terms</p>
            <p>Privacy</p>
            <p>2024</p>
        </div>
        <div className='flex space-x-2'>
            <p>Twitter</p>
            <p>Instgram</p>
            <p>Tiktok</p>
        </div>
      </section>
    </div>
  )
}

export default Footer
