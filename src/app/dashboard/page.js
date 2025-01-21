import ActivitySection from "@/components/dash/root/ActivitySection";
import { StatCards } from "@/components/dash/root/StatCards";

export default async function DashboardPage() {

	return (
		<section className="h-full border border-stone-200 p-2">
			{/* StatCards displays key statistics of the hotel */}
			<StatCards />
			{/* ActivitySection displays activity feed, calendar, and activity graph */}
			<ActivitySection />
		</section>
	);
}
