const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userStorage = require('./userStorage');

const JWT_SECRET = 'your-secret-key-change-in-production'; // Change this in production!

// Register a new user
async function register(email, password) {
  try {
    // Validate input
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }

    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const result = userStorage.createUser(email, hashedPassword);
    
    if (!result.success) {
      return result;
    }

    // Generate JWT token
    const token = generateToken(result.user.id);

    return {
      success: true,
      token,
      user: result.user
    };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'Registration failed' };
  }
}

// Login user
async function login(email, password) {
  try {
    // Validate input
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }

    // Find user
    const user = userStorage.findByEmail(email);
    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Generate JWT token
    const token = generateToken(user.id);

    return {
      success: true,
      token,
      user: { id: user.id, email: user.email }
    };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'Login failed' };
  }
}

// Generate JWT token
function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
}

// Verify JWT token (middleware helper)
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { success: true, userId: decoded.userId };
  } catch (error) {
    return { success: false, message: 'Invalid or expired token' };
  }
}

// Middleware to authenticate requests
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access token required' });
  }

  const result = verifyToken(token);
  if (!result.success) {
    return res.status(403).json({ success: false, message: result.message });
  }

  req.userId = result.userId;
  next();
}

module.exports = {
  register,
  login,
  verifyToken,
  authenticateToken,
  JWT_SECRET
};

