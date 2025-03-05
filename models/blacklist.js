/**
 * Required External Modules
 * mongoose: MongoDB object modeling tool
 */
const mongoose = require("mongoose");

/**
 * Blacklisted Token Schema
 * Stores invalidated JWT tokens for security
 * @typedef {Object} BlacklistedToken
 * @property {string} token - The JWT token that has been invalidated
 * @property {Date} expiresAt - Expiration timestamp of the token
 */
const BlacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, // Automatically remove expired tokens
  },
});

// Export the model for use in authentication system
module.exports = mongoose.model("BlacklistedToken", BlacklistedTokenSchema);
