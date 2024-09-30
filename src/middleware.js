import { NextResponse } from "next/server";
import * as jose from "jose";

// Define an array of protected routes
const protectedRoutes = ['/dashboard', '/join', /* '/profile', '/settings' */];

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  console.log("Token from cookie:", token);

    // Check if the current path is in the protectedRoutes array
    const isProtectedRoute = protectedRoutes.some(route => 
        request.nextUrl.pathname.startsWith(route)
      );

  if (isProtectedRoute) {
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const { payload } = await jose.jwtVerify(token, secret);
        console.log("JWT Verification successful:", payload);
        return NextResponse.next();
      } catch (error) {
        console.log("JWT Verification failed:", error.message);
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
    console.log("TOKEN INVALID OR MISSING");
    return NextResponse.redirect(new URL("/join", request.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/join', '/dashboard', '/dashboard/:path*']
}
