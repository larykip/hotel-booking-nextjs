"use client";

import { useEffect, useState } from "react";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Bell, ChevronDown, LogOut, PencilLine, Sun, Moon, Cloud, CloudRain, CloudSnow, CloudLightning, CloudSun, CloudMoon, Home } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { fetchWeather } from "@/lib/weather";
import { getGreeting } from "@/lib/greeting";
import { Skeleton } from "@/components/ui/skeleton";

const getWeatherIcon = (condition) => {
	const iconMap = {
		clear: Sun,
		cloudy: Cloud,
		"partly-cloudy": CloudSun,
		rain: CloudRain,
		snow: CloudSnow,
		thunderstorm: CloudLightning,
		fog: Cloud,
	};

	const IconComponent = iconMap[condition] || Sun;
	return <IconComponent className="h-5 w-5" />;
};

/**
 * DashHeader component that displays the header for the dashboard with user actions.
 * @returns {JSX.Element} The rendered DashHeader component.
 */
const DashHeader = () => {
	const { user, handleLogout, loading } = useAuth();
	const [weather, setWeather] = useState(null);
	const [weatherLoading, setWeatherLoading] = useState(true);

	useEffect(() => {
		const getWeather = async () => {
			const data = await fetchWeather();
			setWeather(data);
			setWeatherLoading(false);
		};

		getWeather();
	}, []);

	if (loading) {
		return (
			<div className="flex w-full items-center justify-between p-4">
				<Skeleton className="h-4 w-32 bg-gray-200" />

				<div className="flex w-80 items-center gap-4">
					<Skeleton className="h-4 w-full bg-gray-200" />
					<Skeleton className="h-5 w-5 shrink-0 rounded-full bg-gray-200" />
					<Skeleton className="h-4 w-full bg-gray-200" />
				</div>

				<div className="flex items-center gap-4">
					<Skeleton className="h-5 w-5 rounded-sm bg-gray-200" />
					<Skeleton className="h-10 w-10 rounded-full bg-gray-200" />
				</div>
			</div>
		);
	}

	return (
		<header className="flex">
			{/* --- Header Start --- */}
			<div className="flex w-full items-center justify-between px-2 py-4">
				{/* --- Sidebar and Dashboard Title Start --- */}
				<div className="flex items-center gap-4">
					<SidebarTrigger /> {/* Opens/Closes the sidebar */}
					<h1 className="text-xl font-semibold">Dashboard</h1>
				</div>
				{/* --- Sidebar and Dashboard Title End --- */}

				{/* --- User Greeting and Weather Start --- */}
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2 text-sm">
						<span>{getGreeting()},</span>
						<span className="font-bold">{user?.firstName || "User"}!</span>
					</div>
					{/* TODO: Could also be changed to a date instead */}
					<div className="flex items-center gap-2 text-sm">
						{weatherLoading ? (
							<div className="flex items-center gap-2">
								<Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
							</div>
						) : (
							weather && (
								<>
									{getWeatherIcon(weather.icon)}
									<span>{weather.temperature}°C</span>
									<span className="font-bold">{weather.condition}</span>
								</>
							)
						)}
					</div>
				</div>
				{/* --- User Greeting and Weather End --- */}

				{/* --- Actions Start --- */}
				<div className="flex items-center gap-4">
					{/* --- New Reservation Button Start --- */}
					<Button className="gap-2">
						<PencilLine className="h-4 w-4" />
						New Reservation
					</Button>
					{/* --- New Reservation Button End --- */}

					{/* --- Notification Bell Start --- */}
					<Button variant="ghost" size="icon">
						<Bell className="h-5 w-5" />
					</Button>
					{/* --- Notification Bell End --- */}

					{/* --- Account Dropdown Menu Start --- */}
					<DropdownMenu>
						{/* Dropdown menu button */}
						<DropdownMenuTrigger asChild className="rounded-full border-black hover:cursor-pointer">
							<div className="flex items-center gap-1">
								<Image
									width={40}
									height={40}
									// fetch random avatar if user has no avatar
									src={user?.avatar || `https://api.dicebear.com/9.x/glass/svg?seed=${Math.random().toString(36).substring(7)}`}
									alt="avatar"
									unoptimized={true}
									className="rounded-full border border-black"
								/>
								<ChevronDown />
							</div>
						</DropdownMenuTrigger>

						{/* Menu Starts here */}
						<DropdownMenuContent className="mr-5 w-56">
							<DropdownMenuLabel>
								{user?.firstName || ""} {user?.lastName || ""}
							</DropdownMenuLabel>

							<DropdownMenuSeparator />

							<DropdownMenuItem>
								<Link href="/" className="flex items-center gap-2">
									<Home className="h-4 w-4" /> Back to landing page
								</Link>
							</DropdownMenuItem>

							<DropdownMenuSeparator />

							{/* Sign out button */}
							<DropdownMenuItem>
								<button onClick={handleLogout} className="flex w-full items-center gap-2 text-left">
									{" "}
									<LogOut className="h-4 w-4" />
									Sign out
								</button>
							</DropdownMenuItem>
						</DropdownMenuContent>
						{/* Menu Ends here */}
					</DropdownMenu>
					{/* --- Account Dropdown Menu End --- */}
				</div>
				{/* --- Actions End --- */}
			</div>
			{/* --- Header End --- */}
		</header>
	);
};

export default DashHeader;
