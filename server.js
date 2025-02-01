const app = require("./app");
const connectDB = require("./config/database");

// Connect to database
connectDB();

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
