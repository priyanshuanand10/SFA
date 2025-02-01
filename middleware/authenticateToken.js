const jwt = require("jsonwebtoken");
const User = require("../models/User");
const BlacklistedToken = require("../models/blacklist");

const authenticateToken = async (req, res, next) => {
  try {
    const token =
      req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      // return res.status(401).json({
      //   message: "Please sign in to continue. Use Google sign-in or another method.",
      //   redirectUrl: "/",

      //  });
      return res.redirect("/");
    }
    //console.log("token : ", token);

    // Check if token is blacklisted
    const isBlacklisted = await BlacklistedToken.findOne({ token });
    if (isBlacklisted) {
      res.clearCookie("token");
      // return res.status(401).json({
      //   message: "Please sign in to continue. Use Google sign-in or another method.",
      //   redirectUrl: "/",
      // });
      return res.redirect("/");
    }

    // Verify and decode token
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      // Check if token is expired
      const currentTimestamp = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTimestamp) {
        res.clearCookie("token");
        // return res.status(401).json({
        //   message : "Token "
        // })
        return res.redirect("/");
      }

      // Set user in request
      req.user = decoded;

      // Verify user exists in database
      const userExists = await User.findById(decoded.id);
      if (!userExists) {
        res.clearCookie("token");
        // return res.status(401).json({
        //   message : "User not found. Please sign in again.",
        //   redirectUrl : "/",
        // });
        return res.redirect("/");
      }

      next();
    } catch (jwtError) {
      // Handle invalid or expired tokens
      console.error("JWT Verification failed:", jwtError);
      res.clearCookie("token");
      // return res.status(500).json({
      //   message : "Token verification failed. Please sign in again.",
      //   redirectUrl : "/",
      // });

      return res.redirect("/");
    }
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    res.clearCookie("token");
    // return res.status(500).json({
    //   message : "Internal server error. Please try again later.",
    //   redirectUrl : "/",
    // });

    return res.redirect("/");
  }
};

module.exports = authenticateToken;
