const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number }, // optional, used to show discount badge
  description: { type: String },
  image: { type: String },
});

module.exports = mongoose.model("Product", productSchema);