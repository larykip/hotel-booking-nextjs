import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { emailAddress, password } = await req.json();

    await connectMongoDB();

    const user = await User.findOne({ emailAddress });
    // Check if user exists and password is correct
    if (!user || !await bcrypt.compare(password, user.password)) {
      return NextResponse.json(
        { message: 'Invalid credentials!' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id, email: user.emailAddress },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    const response = NextResponse.json({ message: 'Login successful' });

    response.cookies.set('token', token, {
      httpOnly: true,  // This helps prevent client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax', // You can change to 'None' if necessary for cross-site requests
      path: '/',  // Ensure the cookie is sent with every request to the domain
      maxAge: 60 * 60, // 1 hour in seconds (should match token expiration)
    });

    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}