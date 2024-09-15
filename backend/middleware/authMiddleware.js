// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

// Secret key used for signing the token
const SECRET_KEY = 'your_jwt_secret'; // Replace with your secret key

// Middleware to verify the token
const verifyToken = (req, res, next) => {
    // Get the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Assuming token is sent as 'Bearer TOKEN'

    console.log("authHeader: ", authHeader)
    // If no token is found, return an error
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Attach the decoded user data to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, return an error
        res.status(403).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyToken;
