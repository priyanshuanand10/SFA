const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const apiController = require("../controllers/apiController");
const upload = require("../config/multer");

function hello(req, res, next) {
  console.log("hello");
  next();
}


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

// Pest Detection Routes
router.post(
  "/upload-endpoint",hello,
  upload.single("file"),
  apiController.pestDetection
);
router.get("/pest_result", apiController.getPestResult);

// Crop Prices Routes
router.get("/crop-prices_form", authenticateToken, (req, res) =>
  res.render("crop-prices_form")
);
router.get("/get-prices", authenticateToken, apiController.getCropPrices);

// User Info Route
router.get("/user-info", authenticateToken, apiController.getUserInfo);

// Dashboard Route
router.get("/dashboard", authenticateToken, apiController.getDashboard);

module.exports = router;
