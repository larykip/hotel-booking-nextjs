import avatarGenerator from "@/lib/avatar";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import { createResponseWithToken } from "@/lib/tokenUtils";

const bcrypt = require("bcryptjs");

/**
 * Handles POST requests for user creation
 * @param {Request} req - The incoming request object
 * @returns {Promise<Response>} A promise that resolves to the response object
 */
export async function POST(req) {
    try {
        const { firstName, lastName, gender, emailAddress, password, role = 'guest' } = await req.json();
        // hash the provided password for security
        const hashedPassword = await bcrypt.hash(password, 10); // (10) = salt rounds, determining the complexity of the hash
        // generate an avatar for the user
        const userAvatar = await avatarGenerator(gender, firstName);

        await connectMongoDB();

        const newUser = await User.create({
            firstName,
            lastName,
            gender,
            emailAddress,
            avatar: userAvatar,
            password: hashedPassword,
            role
        });
        // Create a response with a JWT token
        return await createResponseWithToken(
            { message: 'User created successfully'},
            201, // HTTP status 201: Created
            newUser._id.toString() // Convert ObjectId to string for JWT payload
        );
    } catch(error){
        // Log the error for debugging purposes
        console.error('Error in POST request:', error);
        // Return a generic error response to avoid leaking sensitive information
        return NextResponse.json(
            { message: 'Internal Server Error' }, 
            { status: 500 } // HTTP status 500: Internal Server Error
        );
    }
}