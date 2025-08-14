import mongoose, { Document, Schema } from 'mongoose';

export interface IInviteCode extends Document {
  code: string;
  createdBy: mongoose.Types.ObjectId;
  usedBy?: mongoose.Types.ObjectId;
  usedAt?: Date;
  expiresAt: Date;
  isUsed: boolean;
  createdAt: Date;
}

const inviteCodeSchema = new Schema<IInviteCode>({
  code: { 
    type: String, 
    required: true, 
    unique: true 
  },
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  usedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  usedAt: { 
    type: Date 
  },
  expiresAt: { 
    type: Date, 
    required: true 
  },
  isUsed: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

// Index for faster queries
inviteCodeSchema.index({ expiresAt: 1 });
inviteCodeSchema.index({ isUsed: 1 });

export const InviteCode = mongoose.model<IInviteCode>('InviteCode', inviteCodeSchema); 