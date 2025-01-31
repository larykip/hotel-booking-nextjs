import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/tokenUtils";

/**
 * Middleware function to handle authentication and redirection.
 * @param {Request} req - The incoming request object.
 * @returns {Promise<NextResponse>} A promise that resolves to the NextResponse object.
 */
export async function middleware(req) {
	const { pathname } = req.nextUrl;

	// Retrieve token from cookies
	const token = req.cookies.get("MetroAuthToken")?.value;

	// Verify the token
	const payload = await verifyToken(token);

	// If the user is authenticated and trying to access /join, redirect to homepage
	if (payload && pathname === "/join") {
		return NextResponse.redirect(new URL("/", req.url));
	} else if (!payload && pathname === "/join") {
		return NextResponse.next();
	}

	// If the token is invalid or not present, redirect
	if (!payload) {
		return NextResponse.redirect(new URL("/", req.url));
	}

	// If the user is authenticated or the route is not protected, continue to the requested route
	return NextResponse.next();
}

export const config = {
	// Apply middleware to these routes
	matcher: [
		"/join",
		"/dashboard",
		"/dashboard/:path*", // matches all sub-paths under dashboard.
		// The : indicates a dynamic segment, the * means it can match zero or more segments.
		// For example, it would match /dashboard/settings, /dashboard/profile/edit, or even just /dashboard.
		"/api/guests",
		"/api/rooms",
		"/api/allusers",
	],
};
