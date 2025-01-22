"use client";

import { useEffect, useState } from "react";
import BookingSheet from "@/components/dash/rooms/BookingSheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Check, HousePlus, Plus, SearchIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * RoomsPage component that displays available rooms and booking options.
 * @returns {JSX.Element} The rendered RoomsPage component.
 */
const RoomsPage = () => {
	const [date, setDate] = useState(new Date()); // State for the selected date
	const [status, setStatus] = useState(""); // State for the selected room status
	const [roomType, setRoomType] = useState(""); // State for the selected room type
	const [selectedRoom, setSelectedRoom] = useState(null); // State for the currently selected room
	const [isBookingOpen, setIsBookingOpen] = useState(false); // State for the booking sheet visibility
	const [roomTypes, setRoomTypes] = useState([]); // State for the list of room types
	const [isLoading, setIsLoading] = useState(true); // State for the loading indicator

	useEffect(() => {
		const fetchRooms = async () => {
			setIsLoading(true); // Set loading state to true
			try {
				const response = await fetch("/api/rooms");
				if (!response.ok) {
					throw new Error("Failed to fetch rooms");
				}
				const data = await response.json();
				setRoomTypes(data);
			} catch (error) {
				console.error("Error fetching rooms:", error);
			} finally {
				setIsLoading(false); // Set loading state to false after fetching
			}
		};
		fetchRooms();
	}, []);

	/**
	 * Handles the booking process for a selected room.
	 * @param {Object} room - The room to be booked.
	 */
	const handleBookNow = (room) => {
		setSelectedRoom(room);
		setIsBookingOpen(true);
	};

	return (
		<section className="h-full bg-stone-200 p-2">
			<div className="mx-auto w-full rounded-lg bg-white p-8">
				{/* - - - Title Bar Start - - - - - - - - - - - - - - - - - - - - -  */}
				<div className="mb-6 flex items-center justify-between">
					<h1 className="text-3xl font-bold">Room booking</h1>
					<div className="flex items-center gap-4">
						{/* Search bar */}
						<div className="flex items-center rounded-md bg-stone-200 px-2 py-1.5 text-sm">
							<SearchIcon className="mr-2" />
							<input type="text" placeholder="Search Rooms" className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none" />
						</div>
						{/* Add new room button */}
						<Button>
							<Plus className="h-4 w-4" /> New Room
						</Button>
					</div>
				</div>
				{/* - - - Title Bar End - - - - - - - - - - - - - - - - - - - - -  */}

				{/* - - - Fitler bar start - - - - - - - - - - - - - - - - - - - - -  */}
				<div className="mb-8 flex items-center gap-4">
					<div className="text-sm text-gray-500">Filter by:</div>

					{/* --- Date filter start --- */}
					<Popover>
						<PopoverTrigger asChild>
							<Button variant={"outline"} className={cn("w-[200px] justify-start text-left font-normal")}>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date ? format(date, "PPP") : <span>Pick a date</span>}
							</Button>
						</PopoverTrigger>

						<PopoverContent className="w-auto p-0">
							<Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
						</PopoverContent>
					</Popover>
					{/* --- Date filter end --- */}

					{/* --- Status filter start --- */}
					<Select value={status} onValueChange={setStatus}>
						<SelectTrigger className="w-[200px]">
							<SelectValue placeholder="Status" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">All</SelectItem>
							<SelectItem value="Available">Available</SelectItem>
							<SelectItem value="Occupied">Occupied</SelectItem>
							<SelectItem value="Maintenance">Maintenance</SelectItem>
							<SelectItem value="Cleaning">Cleaning</SelectItem>
						</SelectContent>
					</Select>
					{/* --- Status filter start --- */}

					{/* --- Room type filter start --- */}
					<Select value={roomType} onValueChange={setRoomType}>
						<SelectTrigger className="w-[200px]">
							<SelectValue placeholder="Room type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="All">All</SelectItem>
							{roomTypes.map((type) => (
								<SelectItem key={type.name} value={type.name}>
									{type.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{/* --- Room type filter start --- */}

					{/* --- Apply filter button --- */}
					<Button variant="outline" className="">
						<Check className="h-4 w-4" /> Apply filters
					</Button>
				</div>
				{/* - - - Fitler bar end - - - - - - - - - - - - - - - - - - - - -  */}

				{/* - - - Room Listing start - - - - - - - - - - - - - - - - - - - - -  */}
				<div className="space-y-8">
					{isLoading ? (
						<div className="flex flex-wrap gap-4">
							<BookingSkeleton />
							<BookingSkeleton />
							<BookingSkeleton />
							<BookingSkeleton />
							<BookingSkeleton />
							<BookingSkeleton />
							<BookingSkeleton />
							<BookingSkeleton />
						</div>
					) : (
						roomTypes.map((type) => (
							<div key={type.name}>
								<div className="mb-4 flex items-center gap-2">
									<h2 className="text-lg font-semibold">{type.name}</h2>
									<Badge variant="secondary" className="bg-gray-100">
										{/* TODO: Should display available rooms currently shows total rooms */}
										{type.rooms.length} Rooms available
									</Badge>
								</div>

								<div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
									{type.rooms.map((room) => (
										<div key={room.id} className={`relative overflow-hidden rounded-lg border p-4 ${getStatusColor(room.status)}/10`}>
											<div className={`absolute left-0 top-0 h-full w-1 ${getStatusColor(room.status)}`} />
											{/* - - - Room details section end - - - - - - - - - - - - - - - - - - - - -  */}
											<div className="mb-4">
												<div className="flex items-center justify-between">
													<div>
														<h3 className="font-semibold">Room {room.roomNumber}</h3>
														<div className="text-sm text-gray-500">
															{room.MaxGuests} Guests • {room.floorNumber}
														</div>
													</div>
													<Badge className={`${getStatusColor(room.status)} bg-opacity-90 hover:${getStatusColor(room.status)}`}>{room.status}</Badge>
												</div>
											</div>
											{/* - - - Room details section end - - - - - - - - - - - - - - - - - - - - -  */}

											{/* - - - Customer Display section start - - - - - - - - - - - - - - - - - - - - -  */}
											{/* Display icon if room available or customer details if booked/occupied */}
											<div className="mb-4 flex h-16 justify-center">
												{room.status === "AVAILABLE" ? (
													<h2 className="flex flex-col items-center font-semibold text-gray-400">
														<HousePlus className="h-10 w-10" />
														Room Available
													</h2>
												) : (
													<div className="flex h-16 w-full flex-col justify-center text-center">
														<p className="font-semibold">{room.guest?.name || "N/A"}</p>
														{room.customer && (
															<p className="text-sm text-gray-500">
																{format(new Date(room.customer.checkIn), "MMM d, yyyy")} - {format(new Date(room.customer.checkOut), "MMM d, yyyy")}
															</p>
														)}
													</div>
												)}
											</div>
											{/* - - - Customer Display section end - - - - - - - - - - - - - - - - - - - - -  */}

											{/* - - - Book button & Price section start - - - - - - - - - - - - - - - - - - - - -  */}
											<div className="bottom-0 flex items-center justify-between border-t-2 border-stone-200">
												{/* TODO: wrong data is probably getting sent in handleBookNow */}
												<Button variant="link" className="px-0 text-teal-500" onClick={() => handleBookNow(room)}>
													{room.status === "AVAILABLE" ? "Book now" : "View details"}
												</Button>
												<div className="flex items-center gap-1 text-right">
													<div className="text-sm text-gray-500">KES</div>
													<div className="font-semibold">{room.price}</div>
												</div>
											</div>
											{/* - - - Book button & Price section end - - - - - - - - - - - - - - - - - - - - -  */}
										</div>
									))}
								</div>
							</div>
						))
					)}
				</div>
				{/* - - - Room Listing end - - - - - - - - - - - - - - - - - - - - -  */}

				<BookingSheet room={selectedRoom} isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />
			</div>
		</section>
	);
};

/**
 * Returns the color class based on the room status.
 * @param {String} status - The status of the room.
 * @returns {String} The color class for the room status.
 */
function getStatusColor(status) {
	switch (status) {
		case "AVAILABLE":
			return "bg-green-500";
		case "OCCUPIED":
			return "bg-red-500";
		case "MAINTENANCE":
			return "bg-yellow-500";
		case "CLEANING":
			return "bg-blue-500";
		case "BOOKED":
			return "bg-purple-500";
		default:
			return "bg-gray-500";
	}
}

// Skeleton component for loading state
const BookingSkeleton = () => (
	<div className="relative w-[450px] animate-pulse gap-4 overflow-hidden rounded-lg border bg-gray-100 p-4">
		<div className="absolute left-0 top-0 h-full w-1 bg-gray-300" />

		<div className="flex justify-between">
			<Skeleton className="mb-4 h-4 w-1/4 rounded-full bg-gray-300" />
			<Skeleton className="h-4 w-1/6 rounded-full bg-gray-300" />
		</div>

		<Skeleton className="mx-auto mb-4 h-[100px] w-full rounded-lg bg-gray-300" />

		<div className="flex items-center justify-between">
			<Skeleton className="h-4 w-1/4 rounded-lg bg-gray-300" />
			<Skeleton className="h-10 w-1/4 rounded-lg bg-gray-300" />
		</div>
	</div>
);

export default RoomsPage;
