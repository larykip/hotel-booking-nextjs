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



const SignInDropDown = ({ handleLogout, user }) => {
  return (
    <section>
        <DropdownMenu>
            {/* Dropdown menu button */}
            <DropdownMenuTrigger asChild className="rounded-full border border-black">
                    <Button variant="ghost" className="p-0 w-full h-full"> 
                        <Image
                            width={50}
                            height={50}
                            // fetch random avatar if user has no avatar
                            src={user.avatar || `https://api.dicebear.com/9.x/glass/svg?seed=${Math.random().toString(36).substring(7)}`}
                            alt="avatar"
                            unoptimized={true}
                            className="rounded-full"
                        />
                    </Button>
            </DropdownMenuTrigger>
            
            {/* Menu Starts here */}
            <DropdownMenuContent className="w-56 mr-5">
                <DropdownMenuLabel>Welcome, {user.firstName}!</DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                <DropdownMenuGroup>
                    {/* Route to main dashboard page*/}
                    <DropdownMenuItem >
                        <Link href="/dashboard" className="flex items-center gap-2"><User className="h-4 w-4" /> My Account</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem >
                        <Link href="/" className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> My Bookings</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Link href="/" className="flex items-center gap-2"><Settings className="h-4 w-4" /> Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link href="/" className="flex items-center gap-2"><LifeBuoy className="h-4 w-4" /> Support</Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                
                {/* Sign out button */}
                <DropdownMenuItem>
                    <Link onClick={handleLogout} href="/" className="flex  items-center gap-2"> <LogOut className="h-4 w-4" />Sign out</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
            {/* Menu Ends here */}
        
        </DropdownMenu>

    </section>


  )
}

export default SignInDropDown;