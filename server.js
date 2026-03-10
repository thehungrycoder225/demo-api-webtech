// server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Load Config
const PORT = process.env.PORT || 3000;
const BASE_URI = process.env.BASE_URI || '/api/v1';

// Import Routes (We will create this later)
const apiRoutes = require('./src/routes/dishRoutes');
const chefRoutes = require('./src/routes/chefRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Use Routes
app.use(BASE_URI, chefRoutes);
app.use(BASE_URI, apiRoutes);
app.use(BASE_URI, authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Base URI: http://localhost:${PORT}${BASE_URI}`);
});
