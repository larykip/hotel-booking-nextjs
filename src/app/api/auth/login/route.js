import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
const bcrypt = require("bcryptjs");

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

    // If login is successful, return a response
    return NextResponse.json(
      { message: 'Login successful', user: { emailAddress: user.emailAddress, name: user.name } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error logging in:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}