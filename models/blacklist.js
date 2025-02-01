const mongoose = require('mongoose');

const BlacklistedTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    expiresAt: { type: Date, required: true }, // Expiration date for the token
});

module.exports = mongoose.model('BlacklistedToken', BlacklistedTokenSchema);
