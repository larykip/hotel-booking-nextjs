import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, ArrowUpRight, Dam, HousePlus, School } from "lucide-react";
import { Button } from "@/components/ui/button";
import { statsData } from "@/lib/testData/dummyData";

export const StatCards = () => {
	const totalRooms = statsData.occupancy.vacant + statsData.occupancy.occupied + statsData.occupancy.notReady;
	const vacantPercentage = (statsData.occupancy.vacant / totalRooms) * 100;
	const occupiedPercentage = (statsData.occupancy.occupied / totalRooms) * 100;
	const notReadyPercentage = (statsData.occupancy.notReady / totalRooms) * 100;

	return (
		<div className="grid grid-cols-3 gap-3">
			{/* --- Start: Reservation and Housekeeping Card --- */}
			<Card className="hover:bg-stone-100">
				<CardHeader>
					<CardTitle className="text-sm font-medium">Reservation</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-3 gap-4">
					<div className="flex items-center gap-2">
						<div>
							<HousePlus className="ml-1 h-4 w-4" />
						</div>
						<div>
							<p className="text-sm text-gray-500">In house</p>
							<p className="flex items-center text-2xl font-bold">{statsData.reservations.inHouse}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<div>
							<ArrowUpRight className="ml-1 h-4 w-4 text-green-600" />
						</div>
						<div>
							<p className="text-sm text-gray-500">Arrival</p>
							<p className="flex items-center text-2xl font-bold text-green-600">{statsData.reservations.arrival}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<div>
							<ArrowDownRight className="ml-1 h-4 w-4 text-red-600" />
						</div>
						<div>
							<p className="text-sm text-gray-500">Arrival</p>
							<p className="flex items-center text-2xl font-bold text-red-600">{statsData.reservations.departure}</p>
						</div>
					</div>
				</CardContent>
				<CardHeader>
					<CardTitle className="text-sm font-medium">House Keeping</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-2 gap-4">
					<div className="flex items-center gap-2">
						<div>
							<School className="ml-1 h-4 w-4" />
						</div>
						<div>
							<p className="text-sm text-gray-500">Rented & dirty</p>
							<p className="text-2xl font-bold">{statsData.housekeeping.rentedDirty}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<div>
							<Dam className="ml-1 h-4 w-4" />
						</div>
						<div>
							<p className="text-sm text-gray-500">Vacant & dirty</p>
							<p className="text-2xl font-bold">{statsData.housekeeping.vacantDirty}</p>
						</div>
					</div>
				</CardContent>
			</Card>
			{/* --- End: Reservation and Housekeeping Card --- */}

			{/* --- Start: Occupancy Card --- */}
			<Card className="hover:bg-stone-100">
				<CardHeader>
					<CardTitle className="text-sm font-medium">Occupancy</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="mb-4 grid grid-cols-3 gap-4">
						<div>
							<p className="text-sm text-gray-500">Vacant</p>
							<p className="text-2xl font-bold">{statsData.occupancy.vacant}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Occupied</p>
							<p className="text-2xl font-bold">{statsData.occupancy.occupied}</p>
						</div>
						<div>
							<p className="text-sm text-gray-500">Not ready</p>
							<p className="text-2xl font-bold">{statsData.occupancy.notReady}</p>
						</div>
					</div>
					<div className="mt-4 flex h-24 w-full overflow-hidden">
						<div className="rounded-lg bg-green-800" style={{ width: `${vacantPercentage}%` }} />
						<div className="rounded-lg bg-green-500" style={{ width: `${occupiedPercentage}%` }} />
						<div className="rounded-lg bg-green-200" style={{ width: `${notReadyPercentage}%` }} />
					</div>
				</CardContent>
			</Card>
			{/* --- End: Occupancy Card --- */}

			{/* --- Start: Revenue Card --- */}
			<Card className="hover:bg-stone-100">
				<CardHeader className="flex">
					<CardTitle className="flex items-center justify-between text-sm font-medium">
						Revenue{" "}
						<Button className="text-gray-400" variant="link">
							Details
						</Button>
					</CardTitle>
				</CardHeader>
				<CardContent className="grid grid-cols-2 gap-4">
					<div>
						<p className="text-sm text-gray-500">Last 30 days</p>
						<span className="flex gap-2 text-2xl">
							Ksh <p className="text-2xl font-bold">{statsData.revenue.last30Days}</p>
						</span>
					</div>
					<div>
						<p className="text-sm text-gray-500">Yesterday</p>
						<span className="flex gap-2 text-2xl">
							Ksh <p className="text-2xl font-bold">{statsData.revenue.yesterday}</p>
						</span>
					</div>
				</CardContent>
			</Card>
			{/* --- End: Revenue Card --- */}
		</div>
	);
};
