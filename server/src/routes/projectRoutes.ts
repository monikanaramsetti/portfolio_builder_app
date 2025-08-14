// src/routes/projectRoutes.ts
import express from 'express';
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getProjectById
} from '../controllers/projectController';
import { protect } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import {
  validateCreateProject,
  validateUpdateProject
} from '../validations/projectValidation';

const router = express.Router();

router
  .route('/')
  .post(protect, validateCreateProject, validate, createProject)
  .get(protect, getProjects);

router
  .route('/:id')
  .get(protect, getProjectById)
  .put(protect, validateUpdateProject, validate, updateProject)
  .delete(protect, deleteProject);

export default router;
