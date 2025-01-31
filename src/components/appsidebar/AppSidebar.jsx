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
				{/* Settings button in expanded mode */}
				<div className="group-data-[collapsible=icon]:hidden">
					<Button asChild variant="outline" className="w-full">
						<Link href="/dashboard/settings">
							<Settings /> Settings
						</Link>
					</Button>
				</div>

				{/* Settings button in collapsed mode */}
				<div className="hidden group-data-[collapsible=icon]:flex">
					<Link href="/dashboard/settings" className="p-2">
						<Settings />
					</Link>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}
