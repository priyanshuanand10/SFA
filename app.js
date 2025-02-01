const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const axios = require("axios");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const FormData = require("form-data");
const cookieParser = require("cookie-parser");
const authenticateToken = require("./middleware/authenticateToken");
const User = require("./models/User");
const Diseases = require("./models/Diseases");
const CropCalendar = require("./models/Crop_calender");
const BlacklistedToken = require("./models/blacklist");

require("dotenv").config();
require("./config/passport");

// File Upload Configuration
const upload = require("./config/multer");

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
app.set("view engine", "ejs");

// Routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));

// Static Routes
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));
app.get("/why-ai", (req, res) => res.render("why-ai"));
app.get("/contact", (req, res) => res.render("contact"));

module.exports = app;
