import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import Room from "@/models/room";

/**
 * Handles GET requests to fetch rooms and group them by type.
 * @returns {Promise<NextResponse>} A promise that resolves to the NextResponse object containing grouped rooms.
 */
export async function GET() {
	try {
		await connectMongoDB();
		const rooms = await Room.find({}).lean();

		// Group rooms by type
		const roomTypes = rooms.reduce((acc, room) => {
			if (!acc[room.roomType]) {
				acc[room.roomType] = [];
			}
			acc[room.roomType].push(room);
			return acc;
		}, {});

		// Convert to array of room types
		const roomTypesArray = Object.entries(roomTypes).map(([name, rooms]) => ({
			name,
			rooms: rooms.map((room) => ({
				...room,
				id: room._id.toString(),
				status: room.availability && room.availability.length > 0 ? "BOOKED" : "AVAILABLE",
			})),
		}));

		return NextResponse.json(roomTypesArray);
	} catch (error) {
		console.error("Error fetching rooms:", error);
		return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 });
	}
}

// export async function GET() {
//     await connectMongoDB();
//     const rooms = await Room.find({}).populate('availability');
//     return NextResponse.json(rooms);
// }

// export async function POST(request) {
//     await connectMongoDB();
//     const data = await request.json();
//     const room = await Room.create(data);
//     return NextResponse.json(room);
// }
