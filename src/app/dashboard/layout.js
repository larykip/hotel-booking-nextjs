import { Inter } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appsidebar/AppSidebar";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Metro Manor - Dashboard",
    description: "City living, refined.",
  };

export default function DashboardLayout({
    children, // will be a page or nested layout
  }) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1"> {/* flex-1 required to grow dashboard section to full width */}
          {/* <SidebarTrigger /> */} {/* Moved to dashheader instead */}
          {children}
        </main>
      </SidebarProvider>
      
    )
  }