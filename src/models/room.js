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
    roomSize: {
        type: String,
        
    },
    price: {
        type: Number,
        required: true
    },
    bedType: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isReserved: {
        type: Boolean,
        required: true
    },
    isOccupied: {
        type: Boolean,
        required: true
    },
    
})

const Room = mongoose.models.Room || mongoose.model('Room', roomSchema)

export default Room;