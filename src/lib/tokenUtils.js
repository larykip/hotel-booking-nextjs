import { NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const alg = "HS256"; // Specify the algorithm used for signing/verifying JWTs

/**
 * Generates a JWT token for a given user ID
 * @param {string} userId - The ID of the user to generate a token for
 * @returns {Promise<string>} A promise that resolves to the generated JWT token
 */
export async function generateToken(userId) {
    return new SignJWT({ userId })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(SECRET);
}

/**
 * Verifies a JWT token and returns its payload
 * @param {string} token - The JWT token to verify
 * @returns {Promise<object|null>} A promise that resolves to the token payload if valid, or null if invalid
 */
export async function verifyToken(token) {
    try {
        const { payload } = await jwtVerify(token, SECRET);
        return payload;
    } catch (error) {
        return null;
    }
}

/**
 * Sets a JWT token as an HTTP-only cookie in the response
 * @param {NextResponse} response - The Next.js response object
 * @param {string} token - The JWT token to set as a cookie
 */
export function setTokenCookie(response, token) {
    response.cookies.set(
        // cookie name
        'MetroAuthToken',
        token,
        {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400 // 1 day in seconds
        }
    );
}

/**
 * Creates a response with data and sets a JWT token cookie
 * @param {object} data - The data to send in the response body
 * @param {number} statusCode - The HTTP status code for the response
 * @param {string} userId - The user ID to include in the JWT token
 * @returns {Promise<NextResponse>} A promise that resolves to the Next.js response object
 */
export async function createResponseWithToken(data, statusCode, userId) {
    const token = await generateToken(userId);
    const response = NextResponse.json(data, { status: statusCode });
    setTokenCookie(response, token);
    return response;
}
