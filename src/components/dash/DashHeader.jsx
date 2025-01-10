import { SidebarTrigger } from '../ui/sidebar'
import { Button } from '../ui/button'
import { Bell, ChevronDown, LogOut, PencilLine, Sun } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '../ui/dropdown-menu'
import Image from 'next/image'
import Link from 'next/link'

const DashHeader = () => {
  return (
    <header className='flex'>
        <div className='flex items-center justify-between px-2 py-4 w-full' >
            <div className='flex items-center gap-4'>
                <SidebarTrigger/> {/* Opens/Closes the sidebar */}
                <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            
            
            <div className='flex items-center gap-4'> 
                <div className='flex items-center gap-2 text-sm'>
                    
                    <span>Good morning,</span>
                    <span className='font-bold'>Username!</span>
                </div>
                {/* TODO: Could also be changed to a date instead */}
                <div className='flex items-center gap-2 text-sm'>
                    <Sun />
                    <span>22°C</span>
                    <span className='font-bold'>Sunny</span>
                </div>

                <Button className="gap-2">
                    <PencilLine className="w-4 h-4"/>
                    New Reservation
                </Button>

                <Button variant="ghost" size="icon">
                    <Bell className="w-5 h-5"/>
                </Button>

                {/* Account dropdown menu start here */}
                <DropdownMenu>
                    {/* Dropdown menu button */}
                    <DropdownMenuTrigger asChild className="rounded-full hover:cursor-pointer border-black">
                        <div className='flex items-center gap-1'>
                            <Image
                                width={40}
                                height={40}
                                // fetch random avatar if user has no avatar
                                src={`https://api.dicebear.com/9.x/glass/svg?seed=${Math.random().toString(36).substring(7)}`}
                                alt="avatar"
                                unoptimized={true}
                                className="rounded-full"
                            />
                            <ChevronDown/>
                        </div>
                                
                    </DropdownMenuTrigger>
                    
                    {/* Menu Starts here */}
                    <DropdownMenuContent className="w-56 mr-5">
                        <DropdownMenuLabel>Username</DropdownMenuLabel>
                        
                        {/* Sign out button */}
                        <DropdownMenuItem>
                            <Link href="/" className="flex  items-center gap-2"> <LogOut className="h-4 w-4" />Sign out</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    {/* Menu Ends here */}
                
                </DropdownMenu>

                {/* Account dropdown menu ends here */}
            </div>
        </div>
    </header>
  )
}

export default DashHeader