// src/controllers/adminController.ts

import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User';
import { InviteCode } from '../models/InviteCode';
import { generateInviteCode } from '../utils/generateInviteCode';
import { AuthenticatedRequest } from '../types/express';

// @desc    Generate invite code for admin creation
// @route   POST /api/admin/invite
// @access  Private/Admin
export const generateInviteCodeForAdmin = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { expiresInHours = 24 } = req.body; // Default 24 hours
  
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + expiresInHours);
  
  const inviteCode = await InviteCode.create({
    code: generateInviteCode(),
    createdBy: req.user!._id,
    expiresAt,
  });

  res.status(201).json({
    inviteCode: inviteCode.code,
    expiresAt: inviteCode.expiresAt,
    message: 'Invite code generated successfully'
  });
});

// @desc    Create admin with invite code
// @route   POST /api/admin/create-with-invite
// @access  Public (but requires valid invite code)
export const createAdminWithInvite = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, inviteCode } = req.body;

  if (!inviteCode) {
    res.status(400);
    throw new Error('Invite code is required');
  }

  // Find and validate invite code
  const invite = await InviteCode.findOne({ 
    code: inviteCode,
    isUsed: false,
    expiresAt: { $gt: new Date() }
  });

  if (!invite) {
    res.status(400);
    throw new Error('Invalid or expired invite code');
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create admin user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'admin',
  });

  // Mark invite code as used
  invite.isUsed = true;
  invite.usedBy = new mongoose.Types.ObjectId(user._id);
  invite.usedAt = new Date();
  await invite.save();

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    message: 'Admin account created successfully'
  });
});

// @desc    Get all invite codes (admin only)
// @route   GET /api/admin/invites
// @access  Private/Admin
export const getAllInviteCodes = asyncHandler(async (req: Request, res: Response) => {
  const invites = await InviteCode.find()
    .populate('createdBy', 'name email')
    .populate('usedBy', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json(invites);
});

// @desc    Create admin (existing method - now requires invite code)
// @route   POST /api/admin/create
// @access  Private/Admin
export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create admin user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'admin', // force role to admin
  });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  });
});

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await User.find().select('-password');
  res.status(200).json(users);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  await user.deleteOne();
  res.status(200).json({ message: 'User removed successfully' });
});

// @desc    Update user by ID (admin only)
// @route   PUT /api/admin/user/:id
// @access  Private/Admin
export const updateUserByAdmin = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const { name, email, role } = req.body;

  user.name = name || user.name;
  user.email = email || user.email;
  user.role = role || user.role;

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
  });
});