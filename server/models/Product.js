const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    brand: { type: String, default: "DairyDelivery" },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    description: { type: String },
    image: { type: String, required: true },
    rating: { type: Number, default: 4.2 },
    stock: { type: Number, default: 50 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);