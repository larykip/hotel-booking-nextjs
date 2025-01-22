"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { fetchCalendarData } from "@/lib/testData/mockApi";

/**
 * CalendarView component that displays a calendar with bookings.
 * @returns {JSX.Element} The rendered CalendarView component.
 */
const CalendarView = () => {
	const [bookings, setBookings] = useState([]);
	const [roomTypes, setRoomTypes] = useState([]);

	useEffect(() => {
		const fetchCalendarDataAsync = async () => {
			const data = await fetchCalendarData();
			setBookings(data.bookings);
			setRoomTypes(data.roomTypes);
		};

		fetchCalendarDataAsync();
	}, []);

	return (
		<Card className="h-full">
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle className="text-base font-medium">Calendar</CardTitle>
				<div className="flex items-center gap-2">
					<Button variant="ghost" size="icon">
						<ChevronLeft className="h-4 w-4" />
					</Button>
					<span className="text-sm">December</span>
					<Button variant="ghost" size="icon">
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			</CardHeader>

			<CardContent>
				<div className="mb-4 flex gap-2">
					{roomTypes.map((type) => (
						<Button key={type.id} variant="outline" className="text-xs">
							{type.name} ({type.count})
						</Button>
					))}
				</div>
				<div className="space-y-4">
					{bookings.map((booking) => (
						<div key={booking.date} className="flex items-center gap-4">
							<div className="w-16 text-sm">
								<div className="font-medium">{booking.date}</div>
								<div className="text-gray-500">{booking.day}</div>
							</div>
							{booking.available ? (
								<Button variant="outline" className="w-full justify-start text-green-600">
									<Plus className="mr-2 h-4 w-4" />
									Available for booking
								</Button>
							) : (
								<div className="flex items-center gap-2">
									{booking.bookings.map((guest, i) => (
										<Avatar key={i}>
											<AvatarImage src={guest.avatar} />
											<AvatarFallback>{guest.user[0]}</AvatarFallback>
										</Avatar>
									))}
								</div>
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

export default CalendarView;
