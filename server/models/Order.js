const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: { type: Array, required: true }, // list of product objects
  totalPrice: { type: Number, required: true },
  status: { type: String, default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);