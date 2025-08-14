// src/validations/projectValidation.ts
import { body } from 'express-validator';

export const validateCreateProject = [
  body('title')
    .notEmpty()
    .withMessage('Title is required'),

  body('description')
    .notEmpty()
    .withMessage('Description is required'),

  body('techStack')
    .isArray({ min: 1 })
    .withMessage('Tech stack must be a non-empty array'),

  body('projectLink')
    .optional()
    .isURL()
    .withMessage('Project link must be a valid URL'),

  body('image')
    .optional()
    .isString()
    .withMessage('Image must be a valid string'),
];

export const validateUpdateProject = [
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string'),

  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),

  body('techStack')
    .optional()
    .isArray()
    .withMessage('Tech stack must be an array'),

  body('projectLink')
    .optional()
    .isURL()
    .withMessage('Project link must be a valid URL'),

  body('image')
    .optional()
    .isString()
    .withMessage('Image must be a valid string'),
];
