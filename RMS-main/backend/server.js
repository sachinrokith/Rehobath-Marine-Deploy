import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/database.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import process from 'process';

import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';
import subAdminRoutes from './routes/subAdmins.js';
import userRoutes from './routes/users.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();

// Get __dirname equivalent in ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

connectDB();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
   ? ['http://localhost:5173'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static file serving removed - images now stored in database as Base64

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'RMS Backend is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/subadmins', subAdminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.use((error, req, res, _next) => {
  console.error('Error:', error);
  
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      error: error.message
    });
  }
  
  if (error.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'Duplicate field value',
      error: 'A record with this value already exists'
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
