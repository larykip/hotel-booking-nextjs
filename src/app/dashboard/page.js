import { DashboardSection } from "@/components/dash/DashboardSection";
import { Sidebar } from "@/components/appsidebar/AppSidebar";
import DashHeader from "@/components/DashHeader";

export default function DashboardPage(){
    return (
        // flex-1 required to grow section to full width
        <section className="min-h-full flex-1">
            <DashHeader/>
            <DashboardSection />
        </section>
    )
}