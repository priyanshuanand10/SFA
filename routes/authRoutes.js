/**
 * Required External Modules
 * express: Web application framework
 * passport: Authentication middleware
 */
const express = require("express");
const router = express.Router();
const passport = require("passport");

/**
 * Required Internal Modules
 * authController: Controller for authentication operations
 */
const authController = require("../controllers/authController");

/**
 * Authentication Routes
 * Defines routes for:
 * - Google OAuth authentication
 * - OAuth callback handling
 * - User logout
 */

// Google OAuth initialization route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  authController.googleCallback
);

// User logout route
router.post("/logout", authController.logout);

// Export router for use in main application
module.exports = router;
