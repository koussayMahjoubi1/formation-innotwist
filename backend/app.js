const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const productRoutes = require('./productRoutes');
const staffRoutes = require('./staffRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ===== TEST POSTMAN ENDPOINTS (Simple routes that always return 200 OK) =====

// GET /test - Simple test endpoint
app.get('/test', (req, res) => {
  res.status(200).json({ 
    success: true, 
    message: 'Test endpoint works!',
    timestamp: new Date().toISOString()
  });
});

// GET /product - Returns all products
app.get('/product', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Products retrieved successfully',
    data: [
      { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
      { id: 2, name: 'Mouse', price: 29.99, category: 'Electronics' },
      { id: 3, name: 'Keyboard', price: 79.99, category: 'Electronics' }
    ]
  });
});

// GET /product/:id - Returns single product
app.get('/product/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    success: true,
    message: 'Product found',
    data: { id: parseInt(id), name: 'Laptop', price: 999.99, category: 'Electronics' }
  });
});

// POST /product - Creates a product
app.post('/product', (req, res) => {
  const { name, price } = req.body;
  res.status(200).json({
    success: true,
    message: 'Product created successfully',
    data: {
      id: Math.floor(Math.random() * 1000),
      name: name || 'Default Product',
      price: price || 0,
      category: req.body.category || 'General'
    }
  });
});

// GET /user - Returns all users
app.get('/user', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Users retrieved successfully',
    data: [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
      { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'user' }
    ]
  });
});

// GET /user/:id - Returns single user
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.status(200).json({
    success: true,
    message: 'User found',
    data: { id: parseInt(id), name: 'John Doe', email: 'john@example.com', role: 'admin' }
  });
});

// POST /user - Creates a user
app.post('/user', (req, res) => {
  const { name, email } = req.body;
  res.status(200).json({
    success: true,
    message: 'User created successfully',
    data: {
      id: Math.floor(Math.random() * 1000),
      name: name || 'Default User',
      email: email || 'user@example.com',
      role: req.body.role || 'user'
    }
  });
});

// POST /auth/login - Login endpoint
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      token: 'mock-jwt-token-12345',
      user: {
        id: 1,
        name: 'Admin User',
        email: email || 'admin@example.com',
        role: 'admin'
      }
    }
  });
});

// POST /auth/register - Register endpoint
app.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  res.status(200).json({
    success: true,
    message: 'User registered successfully',
    data: {
      id: Math.floor(Math.random() * 1000),
      name: name || 'New User',
      email: email || 'newuser@example.com',
      role: 'user'
    }
  });
});

// GET /auth/me - Get current user
app.get('/auth/me', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User retrieved successfully',
    data: {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin'
    }
  });
});

// GET /health - Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// GET /error - Simulates a server error (500)
app.get('/error', (req, res) => {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: 'Something went wrong on the server'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MERN Auth API is running!',
    endpoints: [
      'GET /test',
      'GET /product',
      'GET /product/:id',
      'POST /product',
      'GET /user',
      'GET /user/:id',
      'POST /user',
      'POST /auth/login',
      'POST /auth/register',
      'GET /auth/me',
      'GET /health',
      'GET /error'
    ]
  });
});

// Existing API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/staff', staffRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Test these endpoints in Postman:`);
  console.log(`  GET  http://localhost:${port}/test`);
  console.log(`  GET  http://localhost:${port}/product`);
  console.log(`  GET  http://localhost:${port}/user`);
  console.log(`  GET  http://localhost:${port}/health`);
});
