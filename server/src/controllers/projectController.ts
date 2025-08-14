import asyncHandler from 'express-async-handler';
import { Response } from 'express';
import { Project } from '../models/Project';
import { IUser } from '../models/User';
import { AuthenticatedRequest } from '../types/express'; // ✅ custom extended Request type
import mongoose from 'mongoose';

// @desc    Create new project
// @route   POST /api/projects
// @access  Private
export const createProject = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const { title, description, projectLink, techStack, image } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error('Title and description are required');
  }

  const project = await Project.create({
    userId: req.user!._id,
    title,
    description,
    projectLink,
    techStack,
    image,
  });

  res.status(201).json(project);
});

// @desc    Get logged-in user's projects
// @route   GET /api/projects
// @access  Private
export const getProjects = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const projects = await Project.find({ userId: req.user!._id });
  res.json(projects);
});

// @desc    Get a single project by id
// @route   GET /api/projects/:id
// @access  Private
export const getProjectById = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid project ID');
  }
  const project = await Project.findOne({ _id: req.params.id, userId: req.user!._id });
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  res.json(project);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
export const updateProject = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400);
    throw new Error('Invalid project ID');
  }
  const project = await Project.findOne({ _id: req.params.id, userId: req.user!._id });

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  const updated = await Project.findByIdAndUpdate(req.params.id, {
    ...req.body,
    projectLink: req.body.projectLink,
  }, {
    new: true,
  });

  res.json(updated);
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
export const deleteProject = asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
  const project = await Project.findOne({ _id: req.params.id, userId: req.user!._id });

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  await project.deleteOne();
  res.json({ message: 'Project deleted successfully' });
});
