import crypto from 'crypto';

export const generateInviteCode = (): string => {
  // Generate a random 16-character code
  return crypto.randomBytes(8).toString('hex').toUpperCase();
};

export const generateSecureInviteCode = (): string => {
  // Generate a more secure 32-character code
  return crypto.randomBytes(16).toString('hex').toUpperCase();
};

// Optional: Generate a human-readable code (easier to share)
export const generateReadableInviteCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}; 