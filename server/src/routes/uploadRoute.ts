// src/routes/uploadRoutes.ts
import express from 'express';
import upload from '../middleware/uploadMiddleware';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', protect, upload.single('image'), (req, res) => {
  res.send({ imagePath: `/uploads/${req.file?.filename}` });
});

export default router;
