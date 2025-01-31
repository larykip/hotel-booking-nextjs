import { Inter } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appsidebar/AppSidebar";
import DashHeader from "@/components/dash/DashHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Metro Manor - Dashboard",
	description: "City living, refined.",
};

/**
 * DashboardLayout component that wraps the dashboard pages with sidebar and header.
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The child components to render.
 * @returns {JSX.Element} The rendered DashboardLayout component.
 */
export default function DashboardLayout({
	children, // will be a page or nested layout
}) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex-1">
				{/* flex-1 required to grow this section to full width */}
				{/* <SidebarTrigger /> */} {/* Moved to dashheader instead. Opens/Closes sidebar */}
				<DashHeader /> {/* Dashboard top nav bar */}
				<div className="min-h-screen">
					{/* Pages display here */}
					{children}
				</div>
			</main>
		</SidebarProvider>
	);
}
