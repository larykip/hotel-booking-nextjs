import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/tokenUtils";

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    // Retrieve token from cookies
    const token = req.cookies.get('MetroAuthToken')?.value;

    // Verify the token
    const payload = await verifyToken(token);

    // If the user is authenticated and trying to access /join, redirect to homepage
    if (payload && pathname === '/join') {
        return NextResponse.redirect(new URL('/', req.url));
    } else if (!payload && pathname === '/join') {
        return NextResponse.next();
    }

    // If the token is invalid or not present, redirect
    if (!payload) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // If the user is authenticated or the route is not protected, continue to the requested route
    return NextResponse.next();
}

export const config = {
    matcher: ['/join', '/dashboard'], // Apply middleware to these routes
};
