import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolio extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  profession: string;
  bio: string;
  profileImage: string;
  contactInfo: string;
  skills: string[];
  projects: mongoose.Types.ObjectId[];
  socialLinks: string[];
  templateStyle: string;
}

const portfolioSchema = new Schema<IPortfolio>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    profession: { type: String, required: true },
    bio: { type: String },
    profileImage: { type: String },
    contactInfo: { type: String },
    skills: { type: [String] },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }],
    socialLinks: { type: [String] },
    templateStyle: { type: String, default: 'default' }
  },
  { timestamps: true }
);

export const Portfolio = mongoose.model<IPortfolio>('Portfolio', portfolioSchema);
