import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: "Room", required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalCost: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
}, { timestamps: true });

const Booking = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

export default Booking;
