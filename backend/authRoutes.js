const express = require('express');
const router = express.Router();
const { register, login, authenticateToken } = require('./auth');
const userStorage = require('./userStorage');

// Register endpoint
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const result = await register(email, password);
  
  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const result = await login(email, password);
  
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(401).json(result);
  }
});

// Protected route to get current user info
router.get('/me', authenticateToken, (req, res) => {
  const user = userStorage.findById(req.userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  res.status(200).json({
    success: true,
    user: { id: user.id, email: user.email }
  });
});

// Debug endpoint to see all users (remove in production!)
router.get('/debug/users', (req, res) => {
  res.status(200).json({
    success: true,
    users: userStorage.getAllUsers()
  });
});

module.exports = router;

