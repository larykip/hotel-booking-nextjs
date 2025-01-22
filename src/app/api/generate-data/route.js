import { generateFakeData } from "@/lib/generateFakeData";
import { NextResponse } from "next/server";

/**
 * Handles GET requests to generate fake data.
 * @returns {Promise<NextResponse>} A promise that resolves to the response indicating success or failure.
 */
export async function GET() {
	try {
		await generateFakeData();
		return NextResponse.json({ message: "Fake data generated successfully" }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Failed to generate fake data" }, { status: 500 });
	}
}
