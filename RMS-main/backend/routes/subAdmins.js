import express from 'express';
import {
  createSubAdmin,
  getSubAdmins,
  getSubAdmin,
  updateSubAdmin,
  deleteSubAdmin
} from '../controllers/subAdminController.js';
import { authenticate } from '../middleware/auth.js';
import { authorize } from '../middleware/roleAuth.js';
import { validateRegister, handleValidationErrors } from '../middleware/validation.js';

const router = express.Router();

router.use(authenticate);
router.use(authorize('admin'));

router.post('/', validateRegister, handleValidationErrors, createSubAdmin);
router.get('/', getSubAdmins);
router.get('/:id', getSubAdmin);
router.put('/:id', updateSubAdmin);
router.delete('/:id', deleteSubAdmin);

export default router;
