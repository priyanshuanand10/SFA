/**
 * Required External Modules
 * dotenv: For loading environment variables
 * mongoose: MongoDB object modeling tool
 */
// Load environment variables from .env file
require("dotenv").config();
// Import mongoose for MongoDB connection and schema management
const mongoose = require("mongoose");

/**
 * Establishes connection to MongoDB database
 * Uses MONGO_URI from environment variables
 * Exits process on connection failure
 */
const connectDB = async () => {
  try {
    // Attempt to connect to MongoDB using connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI);

    // Log successful connection
    console.log("MongoDB Connected...");
  } catch (err) {
    // Log any connection errors and exit the process
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// Export the connection function for use in other modules
module.exports = connectDB;
