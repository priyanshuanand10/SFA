/**
 * Required External Modules
 * passport: Authentication middleware for Node.js
 * passport-google-oauth20: Google OAuth 2.0 authentication strategy
 * User: MongoDB user model
 * dotenv: For loading environment variables
 */
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/User");
require("dotenv").config();

/**
 * Google OAuth Strategy Configuration
 * Sets up authentication using Google OAuth 2.0
 * Handles user creation/retrieval in database
 *
 * Environment variables required:
 * - GOOGLE_CLIENT_ID
 * - GOOGLE_CLIENT_SECRET
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    /**
     * Google Strategy Callback
     * @param {string} accessToken - OAuth 2.0 access token
     * @param {string} refreshToken - OAuth 2.0 refresh token
     * @param {Object} profile - User profile from Google
     * @param {Function} done - Passport callback function
     */
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists in database
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser);
        }

        /**
         * Create new user object with Google profile data
         * Includes: Google ID, email, name, and avatar
         */
        const newUser = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName || "Anonymous",
          avatar: profile.photos ? profile.photos[0].value : "",
        });

        // Save new user to database
        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        console.error("Error during Google OAuth strategy:", error);
        done(error, null);
      }
    }
  )
);
