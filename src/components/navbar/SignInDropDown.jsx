"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CreditCard, LifeBuoy, LogOut, Settings, User } from "lucide-react";

/**
 * SignInDropDown component that displays a dropdown menu for signed-in users.
 * @param {Object} props - The component props.
 * @param {Function} props.handleLogout - Function to handle user logout.
 * @param {Object} props.user - The user object containing user information.
 * @returns {JSX.Element} The rendered SignInDropDown component.
 */
const SignInDropDown = ({ handleLogout, user }) => {
	return (
		<section>
			<DropdownMenu>
				{/* Dropdown menu button */}
				<DropdownMenuTrigger asChild className="rounded-full border border-black">
					<Button variant="ghost" className="h-full w-full p-0">
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
				<DropdownMenuContent className="mr-5 w-56">
					<DropdownMenuLabel>Welcome, {user.firstName}!</DropdownMenuLabel>
					<DropdownMenuSeparator />

					<DropdownMenuGroup>
						{/* Route to main dashboard page*/}
						<DropdownMenuItem>
							<Link href="/dashboard" className="flex items-center gap-2">
								<User className="h-4 w-4" /> My Account
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem>
							<Link href="/dashboard/booking" className="flex items-center gap-2">
								<CreditCard className="h-4 w-4" /> My Bookings
							</Link>
						</DropdownMenuItem>

						<DropdownMenuItem>
							<Link href="/dashboard/settings" className="flex items-center gap-2">
								<Settings className="h-4 w-4" /> Settings
							</Link>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Link href="/dashboard/help" className="flex items-center gap-2">
								<LifeBuoy className="h-4 w-4" /> Support
							</Link>
						</DropdownMenuItem>
					</DropdownMenuGroup>

					<DropdownMenuSeparator />

					{/* Sign out button */}
					<DropdownMenuItem>
						<Link onClick={handleLogout} href="/" className="flex items-center gap-2">
							{" "}
							<LogOut className="h-4 w-4" />
							Sign out
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
				{/* Menu Ends here */}
			</DropdownMenu>
		</section>
	);
};

export default SignInDropDown;
