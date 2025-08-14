import { body } from 'express-validator';

export const validateCreatePortfolio = [
  body('name', 'Name is required').not().isEmpty(),
  body('profession', 'Profession is required').not().isEmpty(),
  body('bio', 'Bio is required').not().isEmpty(), // changed from 'about' to 'bio'
  body('contactInfo', 'Contact Info is required').not().isEmpty(),
  body('skills', 'Skills must be an array').isArray(),
  body('projects', 'Projects must be an array of project IDs').isArray(),
  body('socialLinks', 'Social Links must be an array').isArray(),
];
export const validateUpdatePortfolio = [
  body('name', 'Name is required').optional().not().isEmpty(),
  body('profession', 'Profession is required').optional().not().isEmpty(),
  body('bio', 'Bio is required').optional().not().isEmpty(), // changed from 'about' to 'bio'
  body('contactInfo', 'Contact Info is required').optional().not().isEmpty(),
  body('skills', 'Skills must be an array').optional().isArray(),
  body('projects', 'Projects must be an array of project IDs').optional().isArray(),
  body('socialLinks', 'Social Links must be an array').optional().isArray(),
];