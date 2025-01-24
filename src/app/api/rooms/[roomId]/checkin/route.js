import connectMongoDB from "@/lib/mongodb";
import Room from "@/models/room";
import Booking from "@/models/booking";
import { NextResponse } from "next/server";

/**
 * Handles the check-in process for a booked room
 * 
 * @route POST /api/rooms/[roomId]/checkin
 * @param {Object} request - The incoming request object
 * @param {Object} params - URL parameters containing roomId
 * @param {string} params.roomId - The ID of the room to check in
 * @returns {Object} NextResponse with success/error message and status
 * @throws {Error} If database operations fail
 */
export async function POST(request, { params }) {
    try {
        await connectMongoDB();
        const { roomId } = params;

        const room = await Room.findById(roomId).populate('activeBooking');
        if (!room) {
            return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }

        if (room.status !== 'BOOKED') {
            return NextResponse.json({ error: 'Room is not in a bookable state' }, { status: 400 });
        }

        if (!room.activeBooking) {
            return NextResponse.json({ error: 'No active booking found' }, { status: 400 });
        }

        // Update booking status
        await Booking.findByIdAndUpdate(room.activeBooking._id, {
            status: 'CHECKED_IN'
        });

        // Update room status
        await Room.findByIdAndUpdate(roomId, {
            status: 'OCCUPIED'
        });

        return NextResponse.json({ 
            message: 'Check-in successful',
            status: 'OCCUPIED'
        });
    } catch (error) {
        console.error('Check-in error:', error);
        return NextResponse.json({ error: 'Failed to process check-in' }, { status: 500 });
    }
} 