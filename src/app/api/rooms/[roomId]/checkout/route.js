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

        // Update room status and remove active booking
        await Room.findByIdAndUpdate(roomId, {
            status: 'CLEANING',
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