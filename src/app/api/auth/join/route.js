import avatarGenerator from "@/lib/avatar";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";

const bcrypt = require("bcryptjs");


export async function POST(req) {
    try {
        const { firstName, lastName, gender, emailAddress, avatar, password } = await req.json()

        const hashedPassword = await bcrypt.hash(password, 10)

        // generate an avatar for the user
        const userAvatar = await avatarGenerator(gender, firstName);

        await connectMongoDB()
        await User.create({ firstName, lastName, gender, emailAddress, avatar: userAvatar, password: hashedPassword })

        return NextResponse.json(
            { message: 'User created successfully' }, 
            { status: 201 }
        );
    } catch(error){
        console.error('Error in POST request:', error);
        return NextResponse.json(
            { message: 'Internal Server Error' }, 
            { status: 500 }
        );
    }
}