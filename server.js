// Import required modules and configurations
const app = require("./app");
const connectDB = require("./config/database");

// Initialize database connection
// This establishes connection to MongoDB using mongoose
connectDB();

// Server configuration
const PORT = process.env.PORT || 3001; // Use environment port or default to 3001

// Start the server and listen on specified port and all network interfaces
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
