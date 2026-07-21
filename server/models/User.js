const mongoose = require("mongoose");

// Structure of a User document in MongoDB
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "customer" }, // customer or admin
});

module.exports = mongoose.model("User", userSchema);