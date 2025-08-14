// src/models/Project.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  techStack: string[];
  projectLink?: string;
  image?: string;
}

const projectSchema = new Schema<IProject>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], required: true },
    projectLink: { type: String },
    image: { type: String },
  },
  { timestamps: true }
);

export const Project = mongoose.model<IProject>('Project', projectSchema);
