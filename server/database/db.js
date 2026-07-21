const mongoose = require("mongoose");

// This function connects to our MongoDB database
function connectDB() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/dairyDeliveryDB")
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.log("MongoDB connection failed:", error.message);
    });
}

module.exports = connectDB;