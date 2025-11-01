const express = require('express');
const cors = require('cors');
const authRoutes = require('./authRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Enable CORS for React app
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
  res.send('MERN Auth API is running!');
});

// Auth routes
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})