import mongoose, { Schema } from "mongoose";

const paymentSchema = new Schema({
  booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ["credit_card", "paypal", "stripe"], required: true },
  paymentDate: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
}, { timestamps: true });

const Payment = mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export default Payment;
