import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Booking from '@/models/booking';
import Room from '@/models/room';
import mongoose from 'mongoose';

export async function POST(request) {
  let session;
  try {
    await connectMongoDB();
    const { roomId, customerId, checkInDate, checkOutDate, totalCost, guestDetails } = await request.json();

    // Debug log
    console.log('Booking request:', { roomId, checkInDate, checkOutDate });

    const room = await Room.findById(roomId);
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // Explicitly check room status
    console.log('Room status check:', {
      roomNumber: room.roomNumber,
      currentStatus: room.status,
      expectedStatus: 'AVAILABLE'
    });

    if (room.status !== 'AVAILABLE') {
      return NextResponse.json({ 
        error: `Room ${room.roomNumber} is ${room.status.toLowerCase()}, not available for booking`,
        roomStatus: room.status
      }, { status: 409 });
    }

    // Check for conflicting bookings within date range
    const conflictingBooking = await Booking.findOne({
      room: roomId,
      status: { $ne: 'cancelled' },
      $or: [
        {
          checkInDate: { $lte: new Date(checkOutDate) },
          checkOutDate: { $gte: new Date(checkInDate) }
        }
      ]
    });

    if (conflictingBooking) {
      return NextResponse.json({ 
        error: `Room ${room.roomNumber} is already booked for these dates` 
      }, { status: 409 });
    }

    // Start transaction
    session = await mongoose.startSession();
    await session.startTransaction();

    try {
      // Create booking with session
      const [booking] = await Booking.create([{
        customer: customerId,
        room: roomId,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        totalCost,
        guestDetails,
        status: 'confirmed'
      }], { session });

      // Update room status within same transaction
      await Room.findByIdAndUpdate(
        roomId,
        {
          status: 'BOOKED',
          activeBooking: booking._id
        },
        { session, new: true }
      );

      await session.commitTransaction();
      return NextResponse.json({ 
        success: true, 
        booking,
        message: `Room ${room.roomNumber} booked successfully`
      });

    } catch (error) {
      await session.abortTransaction();
      throw error;
    }

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to create booking' 
    }, { status: 500 });
  } finally {
    if (session) {
      await session.endSession();
    }
  }
}
