import { NextResponse } from "next/server";

/**
 * This route clears the authentication cookie, effectively logging out the user.
 * @route POST /api/auth/logout
 * @returns {NextResponse} A response indicating successful logout or an error if it occurs.
 */
export async function POST() {
  try {
    // create a new response
    const response = NextResponse.json(
      { message: 'Logged out successfully' },
      { status: 200 } // HTTP status 200: OK
    );

    // Clear the authentication cookie
    response.cookies.set('MetroAuthToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Set expiration to the past to delete the cookie
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'An error occurred during logout' },
      { status: 500 } // HTTP status 500: Internal Server Error
    )
  };
}
