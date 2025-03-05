/**
 * Required External Modules
 * jwt: JSON Web Token implementation for token verification
 */
const jwt = require("jsonwebtoken");

/**
 * Required Internal Modules
 * User: MongoDB model for user verification
 * BlacklistedToken: MongoDB model for token invalidation checking
 */
const User = require("../models/User");
const BlacklistedToken = require("../models/blacklist");

/**
 * Authentication Middleware
 * Verifies JWT tokens and handles user authentication
 * Checks for token blacklisting and expiration
 * Validates user existence in database
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
const authenticateToken = async (req, res, next) => {
  try {
    // Extract token from cookies or Authorization header
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.redirect("/");
    }

    // Check token blacklist status
    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
      res.clearCookie("token");
      return res.redirect("/");
    }

    // Token verification and user validation
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      // Check if token is expired
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTimestamp) {
        res.clearCookie("token");
        return res.redirect("/");
      }

      // Set user in request
      req.user = decoded;

      // Verify user exists in database
      const userExists = await User.findById(decoded.id);
      if (!userExists) {
        res.clearCookie("token");
        return res.redirect("/");
      }

      next();
    } catch (jwtError) {
      // Handle invalid or expired tokens
      console.error("JWT Verification failed:", jwtError);
      res.clearCookie("token");
      return res.redirect("/");
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.clearCookie("token");
    return res.redirect("/");
  }
};

module.exports = authenticateToken;
