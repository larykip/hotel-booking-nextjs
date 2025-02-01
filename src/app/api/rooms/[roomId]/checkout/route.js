import connectMongoDB from "@/lib/mongodb";
import Room from "@/models/room";
import Booking from "@/models/booking";
import { NextResponse } from "next/server";

/**
 * Handles the check-out process for an occupied room
 * 
 * @route POST /api/rooms/[roomId]/checkout
 * @param {Object} request - The incoming request object
 * @param {Object} params - URL parameters containing roomId
 * @param {string} params.roomId - The ID of the room to check out
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

        if (room.status !== 'OCCUPIED') {
            return NextResponse.json({ error: 'Room is not occupied' }, { status: 400 });
        }

        if (!room.activeBooking) {
            return NextResponse.json({ error: 'No active booking found' }, { status: 400 });
        }

        // Update booking status
        await Booking.findByIdAndUpdate(room.activeBooking._id, {
            status: 'COMPLETED'
        });

        // Update room status and clear booking info
        await Room.findByIdAndUpdate(roomId, {
            status: 'AVAILABLE',
            secondaryStatus: 'CLEANING',
            activeBooking: null,
            customer: null
        });

        return NextResponse.json({ 
            message: 'Check-out successful',
            status: 'CLEANING'
        });
    } catch (error) {
        console.error('Check-out error:', error);
        return NextResponse.json({ error: 'Failed to process check-out' }, { status: 500 });
    }
}