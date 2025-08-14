import { Request, Response, NextFunction } from 'express';

// Define allowed IP addresses for admin access and adds extra security for admin routes
const ALLOWED_ADMIN_IPS = [
  '127.0.0.1',        // localhost
  '::1',              // localhost IPv6
  // Add your specific IP addresses here
  // '192.168.1.100',  // Example: Your home IP
  // '10.0.0.50',      // Example: Your office IP
];

export const adminIPWhitelist = (req: Request, res: Response, next: NextFunction) => {
  const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 'unknown';
  
  console.log(`Admin access attempt from IP: ${clientIP}`);
  
  if (!ALLOWED_ADMIN_IPS.includes(clientIP)) {
    console.log(`Access denied for IP: ${clientIP}`);
    return res.status(403).json({ 
      message: 'Access denied. Admin access is restricted to authorized IP addresses.' 
    });
  }
  
  console.log(`Access granted for IP: ${clientIP}`);
  next();
};

// Optional: Middleware to log all admin access attempts
export const logAdminAccess = (req: Request, res: Response, next: NextFunction) => {
  const clientIP = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || 'unknown';
  const timestamp = new Date().toISOString();
  
  console.log(`[${timestamp}] Admin access attempt from ${clientIP} to ${req.method} ${req.path}`);
  next();
}; 