import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { generateToken, verifyToken, setTokenCookie } from "@/lib/tokenUtils";

/**
 * Handles POST requests for user login
 * @param {Request} req - The incoming request object
 * @returns {Promise<Response>} A promise that resolves to the response object
 */
export async function POST(req) {
	try {
		const { emailAddress, password } = await req.json();

		await connectMongoDB();
		// find user by email
		const user = await User.findOne({ emailAddress });
		// check if user exists and password is correct
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return NextResponse.json(
				{ message: "Email or Password incorrect, Try Again!" },
				{ status: 401 }, // HTTP status 401: Unauthorized
			);
		}
		//generate JWT token
		const token = await generateToken(user._id.toString());
		// create response
		const response = NextResponse.json({ message: "Login successful" });
		// set token as HTTP-only cookie
		setTokenCookie(response, token);

		return response;
	} catch (error) {
		console.error("Error logging in:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }, // HTTP status 500: Internal Server Error
		);
	}
}

/**
 * Handles GET requests for user verification and retrieval
 * @param {Request} req - The incoming request object
 * @returns {Promise<Response>} A promise that resolves to the response object
 */
export async function GET(req) {
	try {
		// Retrieve token from cookies
		const token = req.cookies.get("MetroAuthToken")?.value;

		if (!token) {
			return NextResponse.json(
				{ message: "No token provided" },
				{ status: 401 }, // HTTP status 401: Unauthorized
			);
		}
		// verify token
		const payload = await verifyToken(token);

		if (!payload) {
			return NextResponse.json(
				{ message: "Invalid token" },
				{ status: 401 }, // HTTP status 401: Unauthorized
			);
		}

		await connectMongoDB();

		// Find user by ID (excluding password field)
		const user = await User.findById(payload.userId).select("-password");

		if (!user) {
			return NextResponse.json(
				{ message: "User not found" },
				{ status: 404 }, // HTTP status 404: Not Found
			);
		}

		return NextResponse.json(user);
	} catch (error) {
		console.error("Error fetching user:", error);
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 }); // HTTP status 500: Internal Server Error
	}
}
