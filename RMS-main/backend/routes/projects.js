import express from 'express';
import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';

import { authenticate } from '../middleware/auth.js';
import { validateProject, handleValidationErrors } from '../middleware/validation.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// -------- PUBLIC ROUTES (No Authentication Required) --------
router.get('/', getProjects);
router.get('/:id', getProject);

// -------- PROTECTED ROUTES (Authentication Required) --------
router.use(authenticate);

// Create project with image upload + validation
router.post(
  '/',
  upload.single('image'),
  validateProject,
  handleValidationErrors,
  createProject
);

// Update project with image upload + validation
router.put(
  '/:id',
  upload.single('image'),
  validateProject,
  handleValidationErrors,
  updateProject
);

// Delete project
router.delete('/:id', deleteProject);

export default router;