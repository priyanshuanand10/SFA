// passport-setup.js
const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User"); // Adjust path as necessary

require("dotenv").config();

//console.log(process.env.GOOGLE_CLIENT_ID);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          return done(null, existingUser); // If user exists, return the existing user
        }

        // Create a new user if not found
        const newUser = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.displayName || "Anonymous", // Fallback name if missing
          avatar: profile.photos ? profile.photos[0].value : "", // Optional profile picture
        });

        // Save the new user to the database
        await newUser.save();

        return done(null, newUser);
      } catch (error) {
        console.error("Error during Google OAuth strategy:", error);
        done(error, null);
      }
    }
  )
);
