// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true }, // Ensure name is required
    avatar: { type: String }, // Optional: Profile picture URL
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
