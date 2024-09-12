import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (token) {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        return NextResponse.next();
      } catch (error) {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}
