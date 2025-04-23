require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const albumRoutes = require('./routes/albumRoutes');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://johndoefreetrials:JohnDoe2511@cluster17.gvuz4v8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster17';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/albums', albumRoutes);

// Simple health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', environment: process.env.NODE_ENV });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  const buildPath = path.resolve(__dirname, '../dist');
  app.use(express.static(buildPath));

  // Any route that is not an API route should serve the React app
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.resolve(buildPath, 'index.html'));
    }
  });
}

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', message: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app; 