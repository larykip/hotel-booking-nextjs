import { generateFakeData } from "@/lib/generateFakeData";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		await generateFakeData();
		return NextResponse.json({ message: "Fake data generated successfully" }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "Failed to generate fake data" }, { status: 500 });
	}
}
