import ActivitySection from "@/components/dash/root/ActivitySection";
import { StatCards } from "@/components/dash/root/StatCards";
import CalendarView from "@/components/dash/root/CalendarView";
import ActivityGraph from "@/components/dash/root/ActivityGraph";

/**
 * DashboardPage component that displays key statistics and activity feed.
 * @returns {JSX.Element} The rendered DashboardPage component.
 */
export default async function DashboardPage() {
	return (
		<section className="h-full border border-stone-200 p-2">
			{/* StatCards displays key statistics of the hotel */}
			<StatCards />
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
				{/* ActivitySection displays activity feed and activity graph */}
				<ActivityGraph />
				{/* CalendarView displays a calendar with bookings */}
				<CalendarView />
			</div>
			<div className="mt-4">
				<ActivitySection />
			</div>
		</section>
	);
}
