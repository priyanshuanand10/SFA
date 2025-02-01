const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads directory if it doesn't exist
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  //(this is also validata the file by the property called the extname which validate the extension of the file)
  filename: (req, file, cb) => {
    // Add file type validation
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, `${Date.now()}-${file.originalname}`);
    } else {
      cb(new Error("Only image files (jpeg, jpg, png) are allowed!"), false);
    }
  },
});

// File filter(this is done by mimetype validation=> a file is like myphoto.jpg=> filename.mimetype = image/jpeg)
const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

//both the validataion does the same thing but is recommended  to make the validation more robust :)

// Multer upload configuration( this is the final configuration of the multer):)
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
  },
});

module.exports = upload;

