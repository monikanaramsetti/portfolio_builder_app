import express from 'express';
import { registerUser, loginUser,getProfile,updateProfile } from '../controllers/authController';
import { registerValidation, loginValidation } from '../validations/authValidation';
import { validate } from '../middleware/validateMiddleware';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerValidation, validate, registerUser);
router.post('/login', loginValidation, validate, loginUser);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
export default router;
