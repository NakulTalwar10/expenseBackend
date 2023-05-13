
const jwt = require ('jsonwebtoken');
const userModel = require('../models/userModel');


exports.requireLogin = async(req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: 'Authentication failed: Missing Authorization header' });
    }
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ message: 'Authentication failed: Invalid Authorization header' });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRETS);
    const user = await userModel.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    req.user = user; // Add the user object to the request
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
