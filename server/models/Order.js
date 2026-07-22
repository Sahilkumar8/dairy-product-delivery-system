const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: { type: Array, required: true },
    totalPrice: { type: Number, required: true },
    fullName: String,
    mobile: String,
    email: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
    paymentMethod: { type: String, default: "Cash On Delivery" },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);