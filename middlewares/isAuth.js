const jwt = require('jsonwebtoken');

const isAuthenticated = async (req, res, next) => {
  console.log('Is Auth middleware');

  try {
    
    const token = req.cookies?.token;

    if (!token) {
      throw new Error('No token found in cookies');
    }

    
    const decoded = jwt.verify(token, 'anykey');

    
    req.user = decoded.id;

    console.log('Verified user ID from cookie:', req.user);
    next();
  } catch (err) {
    console.error('Auth error:', err.message);
    res.status(401).json({ message: 'Unauthorized. Please log in again.' });
  }
};

module.exports = isAuthenticated;
