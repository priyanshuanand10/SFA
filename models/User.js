/**
 * Required External Modules
 * mongoose: MongoDB object modeling tool for schema definition
 */
const mongoose = require("mongoose");

/**
 * User Schema
 * Defines the structure for user authentication and profile data
 * @typedef {Object} User
 * @property {string} googleId - Unique identifier from Google OAuth
 * @property {string} email - User's email address
 * @property {string} name - User's display name
 * @property {string} avatar - URL to user's profile picture (optional)
 * @property {Date} createdAt - Timestamp of user creation
 * @property {Date} updatedAt - Timestamp of last update
 */
const userSchema = new mongoose.Schema(
  {
    googleId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String },
  },
  { timestamps: true }
);

// Create and export the User model
const User = mongoose.model("User", userSchema);
module.exports = User;
