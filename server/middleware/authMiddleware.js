const jwt = require("jsonwebtoken");
require("dotenv").config();

// Verifies the token sent from frontend, blocks access if missing/invalid
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided. Please login." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token. Please login again." });
  }
}

// Only allows admin role through
function verifyAdmin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Admins only." });
  }
}

module.exports = { verifyToken, verifyAdmin };