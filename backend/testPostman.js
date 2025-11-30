const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// ===== PRODUCT ENDPOINTS =====

// GET /product - Returns all products (200 OK)
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

// GET /product/:id - Returns single product (200 OK) or (404 Not Found)
app.get('/product/:id', (req, res) => {
  const { id } = req.params;
  if (id === '1') {
    res.status(200).json({
      success: true,
      message: 'Product found',
      data: { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' }
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Product not found',
      error: `Product with id ${id} does not exist`
    });
  }
});

// POST /product - Creates a product (200 OK) or (400 Bad Request)
app.post('/product', (req, res) => {
  const { name, price } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: 'Name and price are required'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'Product created successfully',
    data: {
      id: Math.floor(Math.random() * 1000),
      name,
      price,
      category: req.body.category || 'General'
    }
  });
});

// ===== USER ENDPOINTS =====

// GET /user - Returns all users (200 OK)
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

// GET /user/:id - Returns single user (200 OK) or (404 Not Found)
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  if (id === '1') {
    res.status(200).json({
      success: true,
      message: 'User found',
      data: { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' }
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: `User with id ${id} does not exist`
    });
  }
});

// POST /user - Creates a user (200 OK) or (400 Bad Request)
app.post('/user', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: 'Name and email are required'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'User created successfully',
    data: {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      role: req.body.role || 'user'
    }
  });
});

// ===== AUTH ENDPOINTS =====

// POST /auth/login - Login endpoint (200 OK) or (401 Unauthorized)
app.post('/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: 'Email and password are required'
    });
  }
  
  // Mock login - accept any email/password for testing
  if (email === 'admin@example.com' && password === 'admin123') {
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token: 'mock-jwt-token-12345',
        user: {
          id: 1,
          name: 'Admin User',
          email: 'admin@example.com',
          role: 'admin'
        }
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Login failed',
      error: 'Invalid email or password'
    });
  }
});

// POST /auth/register - Register endpoint (200 OK) or (400 Bad Request)
app.post('/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      error: 'Name, email, and password are required'
    });
  }
  
  res.status(200).json({
    success: true,
    message: 'User registered successfully',
    data: {
      id: Math.floor(Math.random() * 1000),
      name,
      email,
      role: 'user'
    }
  });
});

// GET /auth/me - Get current user (200 OK) or (401 Unauthorized)
app.get('/auth/me', (req, res) => {
  const token = req.headers.authorization;
  
  if (!token || token !== 'Bearer mock-jwt-token-12345') {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized',
      error: 'Invalid or missing token'
    });
  }
  
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

// ===== MISC ENDPOINTS =====

// GET /health - Health check (200 OK)
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// GET /error - Simulates a server error (500 Internal Server Error)
app.get('/error', (req, res) => {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: 'Something went wrong on the server'
  });
});

// GET / - Root endpoint (200 OK)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Test Postman API is running!',
    endpoints: [
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

// Start server
app.listen(port, () => {
  console.log(`Test Postman server running on http://localhost:${port}`);
  console.log(`Try these endpoints:`);
  console.log(`  GET  http://localhost:${port}/product`);
  console.log(`  GET  http://localhost:${port}/user`);
  console.log(`  POST http://localhost:${port}/auth/login`);
  console.log(`  GET  http://localhost:${port}/health`);
});

