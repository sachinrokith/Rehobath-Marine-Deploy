import express from 'express';
import { register, login, getProfile } from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import { validateRegister, validateLogin, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.get('/profile', authenticate, getProfile);

export default router;
