import express from 'express';
import {
  updateProfile,
  changePassword,
  updateSettings,
  getProfile
} from '../controllers/userController.js';
import { authenticate } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticate);

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Profile update validation
const validateProfileUpdate = [
  body('username')
    .optional()
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email')
    .optional()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
];

// Password change validation
const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters'),
];

// Settings update validation
const validateSettingsUpdate = [
  body('emailNotifications')
    .optional()
    .isBoolean()
    .withMessage('Email notifications must be a boolean'),
  body('twoFactorAuth')
    .optional()
    .isBoolean()
    .withMessage('Two-factor authentication must be a boolean'),
  body('darkMode')
    .optional()
    .isBoolean()
    .withMessage('Dark mode must be a boolean'),
];

// Routes
router.get('/profile', getProfile);
router.put('/profile', validateProfileUpdate, handleValidationErrors, updateProfile);
router.put('/password', validatePasswordChange, handleValidationErrors, changePassword);
router.put('/settings', validateSettingsUpdate, handleValidationErrors, updateSettings);

export default router;
