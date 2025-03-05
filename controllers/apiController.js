/**
 * Required External Modules
 * axios: Promise based HTTP client for making requests
 * fs: Node.js file system module for file operations
 * FormData: Module for creating form data objects for file uploads
 */
const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

/**
 * Required Internal Modules
 * User: MongoDB model for user data
 * Diseases: MongoDB model for plant diseases information
 * CropCalendar: MongoDB model for crop calendar data
 */
const User = require("../models/User");
const Diseases = require("../models/Diseases");
const CropCalendar = require("../models/Crop_calender");

/**
 * Weather API Controller
 * Fetches current weather data from WeatherAPI
 * @param {Object} req - Express request object with location query
 * @param {Object} res - Express response object
 */
exports.getWeather = async (req, res) => {
  try {
    const location = req.query.location;
    const apiKey = process.env.WEATHER_API_KEY;
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=no`;
    const response = await axios.get(url);
    res.render("Weatherdata", {
      location: response.data.location,
      current: response.data.current,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
};

/**
 * Crop Calendar Generator
 * Generates planting calendar based on region and crop
 * @param {Object} req - Express request object with region and crop data
 * @param {Object} res - Express response object
 */
exports.generateCalendar = async (req, res) => {
  try {
    const { region, crop } = req.body;
    const cropData = await CropCalendar.findOne({ region, crop });
    if (!cropData) {
      return res
        .status(404)
        .json({ message: "No data found for the selected crop and region" });
    }
    res.render("calender", cropData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Pest Detection API
 * Processes uploaded image for pest detection using CNN model
 * @param {Object} req - Express request object with file upload
 * @param {Object} res - Express response object
 */
exports.pestDetection = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

  try {
    const formData = new FormData();
    formData.append("file", fs.createReadStream(req.file.path));
    console.log("computer networks padh raha hu");
    const apiResponse = await axios.post(process.env.CNN_Model_API, formData, {
      headers: formData.getHeaders(),
    });

    //console.log(apiResponse.data.prediction);

    const diseaseType = apiResponse.data.prediction;
    //console.log("Disease Type:", diseaseType);

    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    res.json({ diseaseType });
  } catch (error) {
    console.error("Error:", error);
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });
    res
      .status(500)
      .json({ message: "Error processing image", error: error.message });
  }
};

/**
 * Pest Result Renderer
 * Fetches and displays detailed information about detected disease
 * @param {Object} req - Express request object with disease query
 * @param {Object} res - Express response object
 */
exports.getPestResult = async (req, res) => {
  try {
    const diseaseType = req.query.disease;
    if (!diseaseType) return res.status(400).send("Disease type not provided");

    const diseaseData = await Diseases.findOne({ disease_type: diseaseType });
    if (!diseaseData) return res.status(404).send("Disease data not found");

    res.render("pest_result", {
      result: diseaseData,
      diseaseType: diseaseType,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

/**
 * Crop Price Fetcher
 * Retrieves crop prices from government API based on location and commodity
 * @param {Object} req - Express request object with search parameters
 * @param {Object} res - Express response object
 */
exports.getCropPrices = async (req, res) => {
  try {
    const { state, district, commodity, arrivalDate } = req.query;
    if (!state || !district || !commodity || !arrivalDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters",
      });
    }

    const apiKey = process.env.CROP_PRICE_API;
    const url =
      `https://api.data.gov.in/resource/35985678-0d79-46b4-9ed6-6f13308a1d24?` +
      `api-key=${apiKey}&format=json&offset=0&limit=5&` +
      `filters%5BState.keyword%5D=${encodeURIComponent(state)}&` +
      `filters%5BDistrict.keyword%5D=${encodeURIComponent(district)}&` +
      `filters%5BCommodity.keyword%5D=${encodeURIComponent(commodity)}&` +
      `filters%5BArrival_Date%5D=${encodeURIComponent(arrivalDate)}`;

    const response = await axios.get(url);
    const data = response.data;

    res.render("Crop_prices", { records: data.records || [] });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch crop prices",
      error: error.message,
    });
  }
};

/**
 * User Information Controller
 * Retrieves authenticated user's information
 * @param {Object} req - Express request object with user ID
 * @param {Object} res - Express response object
 */
exports.getUserInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * Dashboard Controller
 * Renders user dashboard with personalized information
 * @param {Object} req - Express request object with user authentication
 * @param {Object} res - Express response object
 */
exports.getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send("User not found");

    res.render("dashboard", {
      user: {
        name: user.name,
        avatarUrl: user.avatar,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
};
