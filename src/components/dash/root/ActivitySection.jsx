import React from "react";
import ActivityGraph from "./ActivityGraph";
import CalendarView from "./CalendarView";
import ActivityFeed from "./ActivityFeed";

const ActivitySection = async () => {

	return (
		<div className="grid grid-cols-12 gap-3 py-3">
			<div className="col-span-8 space-y-3">
				<ActivityGraph />
				<ActivityFeed />
			</div>
			<div className="col-span-4 rounded-lg border bg-white">
        <CalendarView />
			</div>
		</div>
	);
};

export default ActivitySection;
