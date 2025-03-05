/**
 * Required External Modules
 * multer: Middleware for handling multipart/form-data (file uploads)
 * path: Node.js path module for handling file paths
 * fs: Node.js file system module for directory operations
 */
const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * Initialize upload directory
 * Creates 'uploads' directory if it doesn't exist
 */
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

/**
 * Multer Storage Configuration
 * Handles file destination and filename generation
 * Includes file type validation for images
 */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Define allowed file extensions
    const allowedTypes = /jpeg|jpg|png/;
    // Validate file extension
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Validate file mimetype
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, `${Date.now()}-${file.originalname}`);
    } else {
      cb(new Error("Only image files (jpeg, jpg, png) are allowed!"), false);
    }
  },
});

/**
 * File Filter Configuration

 */
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

/**
 * Multer Configuration Object
 * Combines storage, file filter, and file size limits
 * Maximum file size: 5MB
 */
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

module.exports = upload;
