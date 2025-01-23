import mongoose from "mongoose";
import User from "../models/user.js";
import Room from "../models/room.js";
import Booking from "../models/booking.js";
import Payment from "../models/payment.js";

export const clearCollection = async (collection) => {
    try {
        await mongoose.connection.collection(collection).deleteMany({});
        console.log(`✓ Cleared ${collection} collection`);
    } catch (error) {
        console.error(`✕ Error clearing ${collection} collection:`, error);
        throw error;
    }
};

export const getCollectionStats = async () => {
    try {
        const stats = {
            users: await User.countDocuments(),
            rooms: await Room.countDocuments(),
            bookings: await Booking.countDocuments(),
            payments: await Payment.countDocuments()
        };
        return stats;
    } catch (error) {
        console.error("Error getting collection stats:", error);
        throw error;
    }
};

export const validateDatabase = async () => {
    const errors = [];
    
    // Check for rooms with invalid bookings
    const roomsWithInvalidBookings = await Room.find({
        activeBooking: { $ne: null }
    }).populate('activeBooking');
    
    roomsWithInvalidBookings.forEach(room => {
        if (room.activeBooking && !room.activeBooking._id) {
            errors.push(`Room ${room.roomNumber} has invalid booking reference`);
        }
    });

    // Check for bookings with invalid references
    const bookingsWithInvalidRefs = await Booking.find()
        .populate('customer')
        .populate('room');
    
    bookingsWithInvalidRefs.forEach(booking => {
        if (!booking.customer) {
            errors.push(`Booking ${booking._id} has invalid customer reference`);
        }
        if (!booking.room) {
            errors.push(`Booking ${booking._id} has invalid room reference`);
        }
    });

    return errors;
};

export const validateRoomBookings = async () => {
    const issues = [];
    
    // Check rooms marked as OCCUPIED or BOOKED
    const occupiedOrBookedRooms = await Room.find({
        status: { $in: ['OCCUPIED', 'BOOKED'] }
    }).populate('activeBooking');

    for (const room of occupiedOrBookedRooms) {
        if (!room.activeBooking) {
            issues.push(`Room ${room.roomNumber} is ${room.status} but has no activeBooking`);
            // Auto-fix: Set room to AVAILABLE if no booking exists
            await Room.findByIdAndUpdate(room._id, {
                status: 'AVAILABLE',
                activeBooking: null
            });
            console.log(`Fixed: Reset room ${room.roomNumber} to AVAILABLE`);
        }
    }

    // Check active bookings without proper room status
    const activeBookings = await Booking.find({
        status: { $in: ['confirmed', 'checked_in'] }
    }).populate('room');

    for (const booking of activeBookings) {
        const expectedStatus = booking.status === 'checked_in' ? 'OCCUPIED' : 'BOOKED';
        if (booking.room.status !== expectedStatus) {
            issues.push(`Booking ${booking._id} status mismatch with room ${booking.room.roomNumber}`);
            // Auto-fix: Update room status to match booking
            await Room.findByIdAndUpdate(booking.room._id, {
                status: expectedStatus,
                activeBooking: booking._id
            });
            console.log(`Fixed: Updated room ${booking.room.roomNumber} status to ${expectedStatus}`);
        }
    }

    return issues;
};
