import express from 'express';
import {
  createPortfolio,
  getAllPortfolios,
  getMyPortfolio,
  updatePortfolio,
  deletePortfolio,
  getPortfolioById
} from '../controllers/portfolioController';
import { protect } from '../middleware/authMiddleware';
import { validate } from '../middleware/validateMiddleware';
import {
  validateCreatePortfolio,
  validateUpdatePortfolio
} from '../validations/portfolioValidation';

const router = express.Router();

function adminOnly(req: any, res: any, next: any) {
  if (req.user && req.user.role === 'admin') return next();
  return res.status(403).json({ message: 'Admin access required' });
}

router.post('/', protect, validateCreatePortfolio, validate, createPortfolio);
router.get('/me', protect, getMyPortfolio);
router.put('/me', protect, validateUpdatePortfolio, validate, updatePortfolio);
router.delete('/me', protect, deletePortfolio);
router.delete('/:id', protect, adminOnly, deletePortfolio);
router.get('/:id', getPortfolioById);
router.get('/', getAllPortfolios);

export default router;
