import express from 'express';
import { 
  createAdmin, 
  getAllUsers, 
  deleteUser, 
  updateUserByAdmin,
  generateInviteCodeForAdmin,
  createAdminWithInvite,
  getAllInviteCodes
} from '../controllers/adminController';
import { protect, adminOnly } from '../middleware/authMiddleware';
import { adminIPWhitelist, logAdminAccess } from '../middleware/ipWhitelistMiddleware';

const router = express.Router();

// Apply IP whitelist and logging to all admin routes
router.use(logAdminAccess);
router.use(adminIPWhitelist);

// Invite code routes
router.post('/invite', protect, adminOnly, generateInviteCodeForAdmin);
router.get('/invites', protect, adminOnly, getAllInviteCodes);

// Admin creation routes
router.post('/create', protect, adminOnly, createAdmin);
router.post('/create-with-invite', createAdminWithInvite); // Public route but requires invite code

// User management routes
router.get('/users', protect, adminOnly, getAllUsers);
router.delete('/user/:id', protect, adminOnly, deleteUser);
router.put('/user/:id', protect, adminOnly, updateUserByAdmin);

export default router;
