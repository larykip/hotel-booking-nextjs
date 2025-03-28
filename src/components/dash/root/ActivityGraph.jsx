"use client";

import React, { useEffect, useState } from "react";
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { fetchBookingGraphData } from "@/lib/testData/mockApi";

const CustomTooltip = ({ active, payload, label }) => {
	if (active && payload && payload.length) {
		return (
			<div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
				<p className="font-medium">{label}</p>
				<p className="text-sm text-green-600">Bookings: {payload[1].value}</p>
				<p className="text-sm text-blue-600">Occupancy: {payload[0].value}%</p>
				<p className="text-sm text-purple-600">Revenue: KES {payload[2].value}</p>
			</div>
		);
	}
	return null;
};

/**
 * ActivityGraph component that displays a graph of booking activities.
 * @returns {JSX.Element} The rendered ActivityGraph component.
 */
const ActivityGraph = () => {
	const [bookingGraphData, setBookingGraphData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchBookingGraphData();
			setBookingGraphData(data);
		};

		fetchData();
	}, []);

	return (
		<div className="overflow-hidden rounded-lg border border-stone-300 bg-white mb-4 md:mb-0">
			<div className="px-4 py-8">
				<h3 className="font-medium">Weekly Performance</h3>
				<p className="text-sm text-gray-500">Occupancy, bookings and revenue trends</p>
			</div>

			<div className="h-80 rounded-lg bg-white px-4 pb-6">
				<ResponsiveContainer width="100%" height="100%">
					<ComposedChart data={bookingGraphData} margin={{ top: 10, right: 32, left: 25, bottom: 10 }}>
						<CartesianGrid strokeDasharray="3 3" className="stroke-stone-200" />
						<XAxis dataKey="name" padding={{ left: 0, right: 0 }} tick={{ fill: "#6b7280" }} />
						<YAxis 
							yAxisId="left" 
							tick={{ fill: "#6b7280" }} 
							domain={[0, 100]} 
							label={{ 
								value: "Occupancy %", 
								angle: -90, 
								position: "insideLeft", 
								fill: "#6b7280", 
								dx: -2,
								style: { textAnchor: 'middle' }
							}} 
						/>
						<YAxis
							yAxisId="right"
							orientation="right"
							tick={{ fill: "#6b7280" }}
							label={{ 
								value: "Revenue (KES)", 
								angle: 90, 
								position: "insideRight", 
								fill: "#6b7280", 
								dx: 30,
								style: { textAnchor: 'middle' }
							}}
						/>
						<Tooltip content={<CustomTooltip />} />
						<Legend />
						<Bar yAxisId="right" dataKey="bookingsCount" fill="#22c55e" name="Bookings" opacity={0.8} radius={[4, 4, 0, 0]} />
						<Line yAxisId="left" type="monotone" dataKey="occupancyRate" stroke="#3b82f6" name="Occupancy %" strokeWidth={2} dot={false} />
						<Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#a855f7" name="Revenue (KES)" strokeWidth={2} dot={false} />
					</ComposedChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default ActivityGraph;
