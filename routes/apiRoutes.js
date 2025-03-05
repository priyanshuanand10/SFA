/**
 * Required External Modules
 * express: Web application framework
 */
const express = require("express");
const router = express.Router();

/**
 * Required Internal Modules
 * authenticateToken: JWT authentication middleware
 * apiController: Controller for API endpoints
 * upload: Multer configuration for file uploads
 */
const authenticateToken = require("../middleware/authenticateToken");
const apiController = require("../controllers/apiController");
const upload = require("../config/multer");

/**
 * Middleware Functions
 * Debug middleware for testing purposes
 */
function hello(req, res, next) {
  console.log("hello");
  next();
}

/**
 * Route Definitions
 * Groups routes by feature:
 * - Weather API routes
 * - Crop Calendar routes
 * - Pest Detection routes
 * - Crop Prices routes
 * - User Management routes
 */

// Weather Routes
router.get("/weather", authenticateToken, (req, res) =>
  res.render("weatherform")
);
router.get("/get-weather", authenticateToken, apiController.getWeather);

// Crop Calendar Routes
router.get("/crop-calendar", authenticateToken, (req, res) =>
  res.render("calenderform")
);
router.post(
  "/generate-calendar",
  authenticateToken,
  apiController.generateCalendar
);

// Pest Detection Routes - Some routes public for API access
router.post(
  "/upload-endpoint",
  hello,
  upload.single("file"),
  apiController.pestDetection
);
router.get("/pest_result", apiController.getPestResult);

// Crop Prices Routes
router.get("/crop-prices_form", authenticateToken, (req, res) =>
  res.render("crop-prices_form")
);
router.get("/get-prices", authenticateToken, apiController.getCropPrices);

// User Information Routes
router.get("/user-info", authenticateToken, apiController.getUserInfo);
router.get("/dashboard", authenticateToken, apiController.getDashboard);

// Export router for use in main application
module.exports = router;
