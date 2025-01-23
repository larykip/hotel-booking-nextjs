import mongoose from 'mongoose';
import Room from '@/models/room'; 

const bookingSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    guestDetails: {
        firstName: String,
        lastName: String,
        adults: Number,
        children: Number,
        specialRequests: String
    },
    status: {
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'CHECKED_IN', 'CANCELLED', 'COMPLETED'],
        default: 'PENDING'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;