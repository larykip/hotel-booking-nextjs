import mongoose, { Schema } from "mongoose";


const roomSchema = new Schema({
    roomNumber: {
        type: Number,
        required: true,
        unique: true
    },
    floorNumber: {
        type: String,
        required: true
    },
    roomType: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amenities: [String],
    images: [String],
    description: {
        type: String,
        required: true
    },
    MaxGuests: { type: Number, required: true },
    activeBooking: { 
        type: Schema.Types.ObjectId, 
        ref: 'Booking'
    },
    status: {
        type: String,
        enum: ['AVAILABLE', 'OCCUPIED', 'BOOKED', 'MAINTENANCE'],
        default: 'AVAILABLE'
    },
    secondaryStatus: {
        type: String,
        enum: ['NONE', 'CLEANING'],
        default: 'NONE'
    }
    
}, { timestamps: true })

// Add a pre-find middleware to always populate activeBooking
roomSchema.pre('find', function() {
    this.populate({
        path: 'activeBooking',
        populate: {
            path: 'customer',
            select: 'firstName lastName emailAddress'
        }
    });
});

roomSchema.pre('findOne', function() {
    this.populate({
        path: 'activeBooking',
        populate: {
            path: 'customer',
            select: 'firstName lastName emailAddress'
        }
    });
});

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema)

export default Room;