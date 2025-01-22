import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

/**
 * Handles GET requests to fetch guests.
 * @returns {Promise<NextResponse>} A promise that resolves to the NextResponse object containing guests.
 */
export async function GET() {
	await connectMongoDB();
	const guests = await User.find({ role: "guest" });
	// console.log(guests);
	return NextResponse.json(guests);
}

/**
 * Handles POST requests to create a new guest.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} A promise that resolves to the NextResponse object containing the created guest.
 */
export async function POST(request) {
	await connectMongoDB();
	const data = await request.json();
	const guest = await User.create(data);
	return NextResponse.json(guest);
}
