import express from 'express';
import { submitContact, getContacts, updateContactStatus } from '../controllers/contactController.js';

const router = express.Router();

// Public route for contact form submission
router.post('/submit', submitContact);

// Protected routes for admin (add authentication middleware later)
router.get('/', getContacts);
router.put('/:id/status', updateContactStatus);

export default router;
