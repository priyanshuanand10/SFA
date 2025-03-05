// Core Node.js modules
const path = require("path"); // Path manipulation utility
const fs = require("fs"); // File system operations

// Authentication & Security
const jwt = require("jsonwebtoken"); // JSON Web Token implementation
const passport = require("passport"); // Authentication middleware
const cookieParser = require("cookie-parser"); // Parse Cookie header and populate req.cookies

// Express Framework
const express = require("express"); // Web application framework

// HTTP & Form Handling
const axios = require("axios"); // Promise based HTTP client
const multer = require("multer"); // Multipart form data handling
const FormData = require("form-data"); // Form data handling utility

// Custom Middleware & Authentication
const authenticateToken = require("./middleware/authenticateToken"); // JWT verification middleware

// Database Models
const User = require("./models/User"); // User model schema
const Diseases = require("./models/Diseases"); // Plant diseases model schema
const CropCalendar = require("./models/Crop_calender"); // Crop calendar model schema
const BlacklistedToken = require("./models/blacklist"); // Token blacklist model schema

// Load environment variables
require("dotenv").config();

// Initialize Passport configuration
require("./config/passport");

// Configure file upload settings
const upload = require("./config/multer");

// Initialize Express application
const app = express();

// === Middleware Configuration ===
// Parse JSON payloads
app.use(express.json());
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
// Parse cookies in requests
app.use(cookieParser());
// Initialize Passport authentication
app.use(passport.initialize());
// Set EJS as the view engine
app.set("view engine", "ejs");

// === Route Configuration ===
// Authentication routes
app.use("/auth", require("./routes/authRoutes"));
// API routes
app.use("/api", require("./routes/apiRoutes"));

// === Static Page Routes ===
// Home page
app.get("/", (req, res) => res.render("index"));
// About page
app.get("/about", (req, res) => res.render("about"));
// Why AI page
app.get("/why-ai", (req, res) => res.render("why-ai"));
// Contact page
app.get("/contact", (req, res) => res.render("contact"));

// Export the configured Express application
module.exports = app;
