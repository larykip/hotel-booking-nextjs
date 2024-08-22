import { Button } from "@/components/ui/button"
import { ChevronUp } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <div className='flex flex-col pt-4 w-full items-center mt-4 gap-y-2 bg-gray-200'>
      <section>
        <Button className="flex items-center">
          <ChevronUp className="h-4 w-4 mr-2" />
          <Link href="#">Back to top</Link>
        </Button>
        {/* <button className='bg-black text-white py-2 px-3 rounded-2xl'>Back to Top</button> */}
      </section>
      
      <section className='flex justify-around w-full'>
        <div>
            <h2 className='m-2 font-bold ml-0 t'>Support</h2>
            <ul className='space-y-2'>
                <li><a>Help Center</a></li>
                <li>Disability Support<a></a></li>
                <li><a>Cancellation Options</a></li>
                <li><a>Anti-Discrimination</a></li>
            </ul>
        </div>
        <div>
            <h2 className='m-2 font-bold ml-0 t'>Legal</h2>
            <ul className='space-y-2'>
                <li><a>Terms of Service</a></li>
                <li><a>Privacy Policy</a></li>
                <li>Cookie Policy<a></a></li>
                <li><a>Contact Us</a></li>
            </ul>
        </div>
        <div>
            <h2 className='m-2 font-bold ml-0 t'>About Us</h2>
            <ul className='space-y-2'>
                <li><a>About Us</a></li>
                <li><a>Our Story</a></li>
                <li>Careers<a></a></li>
                <li><a>Press</a></li>
            </ul>
        </div>
      </section>

      <section className='flex p-1 justify-around w-full border-t-2 border-white'>
        <div className='flex space-x-2'>
            <p>All Rights Reserved ©️ 2024</p>
        </div>
        <div className='flex space-x-2'>
            <Image 
              src="images/icons8-twitterx.svg" 
              width={25} 
              height={25} 
              alt="Twitter logo"
            />
            <p>@MetroManor</p>

            <Image 
              src="images/icons8-instagram.svg" 
              width={25} 
              height={25} 
              alt="Instagram logo"
            />
            <p>@MetroManor</p>

            <Image 
              src="images/icons8-tiktok.svg" 
              width={25} 
              height={25} 
              alt="TikTok logo"
            />
            <p>@MetroManor</p>
        </div>
      </section>
    </div>
  )
}

export default Footer
