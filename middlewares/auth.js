// middlewares/auth.js
const jwt = require('jsonwebtoken');

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  // Extract token from request headers
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(402).json({ message: 'Authentication failed: No token provided' });
  }

  // Verify token
  jwt.verify(token, 'geronimo_secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
    req.user = decoded.user;
    next();
  });
};

module.exports = { authenticateUser };