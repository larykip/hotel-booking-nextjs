// SHADCN SIDEBAR
import { Bed, HelpCircle, Home, Settings, Users } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import Search from "./Search";
import { Button } from "../ui/button";

// Menu items.
const navigation = [
	{
		title: "Home",
		url: "/dashboard",
		icon: Home,
	},
	{
		title: "Rooms",
		url: "/dashboard/rooms",
		icon: Bed,
	},
	{
		title: "Users",
		url: "/dashboard/users",
		icon: Users,
	},
	{
		title: "Help",
		url: "/dashboard/help",
		icon: HelpCircle,
	},
];

/**
 * AppSidebar component that displays the sidebar navigation for the application.
 * @returns {JSX.Element} The rendered AppSidebar component.
 */
export function AppSidebar() {
	return (
		// TODO: Sidebar is not scrollable when collapsed
		<Sidebar collapsible="icon">
			<SidebarHeader>
				{/* Logo */}
				<Link href="/dashboard" className="flex w-full justify-center">
					<Image width={50} height={50} src="/images/logo.jpg" alt="logo" className="shrink-0 rounded-b-md" />
				</Link>
			</SidebarHeader>

			<SidebarContent>
				{/* Search bar */}
				<SidebarGroup>
					{/* TODO: Search bar does not collapse properly when sidebar is collapsed */}
					<Search />
				</SidebarGroup>

				{/* Navigation links */}
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{navigation.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link href={item.url}>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter>
				{/* Settings button */}
				<Button asChild variant="outline" className="w-full">
					<Link href="/dashboard/settings">
						<Settings /> Settings
					</Link>
				</Button>
			</SidebarFooter>
		</Sidebar>
	);
}

// CUSTOM SIDEBAR DESIGN

// import LogoutButton from './LogoutButton'
// import AccountToggle from './AccountToggle'
// import Search from './Search'

// export const Sidebar = () => {
//   return (
//     <section className='p-4 border-r border-r-stone-400 border-opacity-25 bg-neutral-200'>

//         <div className='overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]'>
//           <AccountToggle />
//           <Search />
//         </div>

//         {/* TODO: Logout button */}
//         <LogoutButton />

//     </section>
//   )
// }
