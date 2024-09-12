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

    // If login is successful, return a response
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}