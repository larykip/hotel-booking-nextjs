import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    role: { type: String, enum: ['guest', 'admin'], default: 'guest' },
    // currentAddress: {
    //     type: String,
    //     required: true
    // },
    // contactNumber: {
    //     type: String,
    //     required: true
    // },
    // idType: {
    //     type: { String, enum: ['National-ID', 'Passport'], default: 'National-ID' },
    //     // required: true
    // },
    // idNumber: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;