import connectMongoDB from "@/lib/mongodb";
import Room from "@/models/room";
import Booking from "@/models/booking";
import { NextResponse } from "next/server";

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