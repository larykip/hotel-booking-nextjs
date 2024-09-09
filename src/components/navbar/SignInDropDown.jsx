import { Button } from "@components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { CreditCard, LifeBuoy, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";



const SignInDropDown = () => {
  return (
    <section>
        <DropdownMenu>
            {/* Dropdown menu button */}
            <DropdownMenuTrigger asChild className="rounded-full border border-black">
                    {/* TODO: This should take user avatar from database */}
                    <Image
                        width={50}
                        height={50}
                        src="https://api.dicebear.com/9.x/notionists/svg?seed=John&hair=hat,variant60,variant53,variant49,variant44&beardProbability=100&bodyIconProbability=20&gestureProbability=0"
                        alt="avatar"
                        unoptimized={true}
                        className="rounded-full"
                    />
            </DropdownMenuTrigger>
            
            {/* Menu Starts here */}
            <DropdownMenuContent className="w-56 mr-5">
                {/* TODO: Consider using user's name instead of 'My Account' */}
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuGroup>
                    <DropdownMenuItem >
                        <Link href="/" className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> My Bookings</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link href="/" className="flex items-center gap-2"><User className="h-4 w-4" /> Profile</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link href="/" className="flex items-center gap-2"><Settings className="h-4 w-4" /> Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/" className="flex items-center gap-2"><LifeBuoy className="h-4 w-4" /> Support</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                
                <DropdownMenuItem>
                    <Link href="/" className="flex  items-center gap-2"> <LogOut className="h-4 w-4" />Sign out</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
            {/* Menu Ends here */}
        
        </DropdownMenu>

    </section>


  )
}

export default SignInDropDown;